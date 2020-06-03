import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../../models/course.interface';
import {CourseService} from '../../services/course.service';
import {filter, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FavouritesCoursesService} from '../../services/favouritesCourses.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CoursesReactiveFormComponent} from '../courses-reactive-form/courses-reactive-form.component';
import {FavouriteCourse} from '../../models/favouriteCourse.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses-cards-listing.component.html',
  styleUrls: ['./courses-cards-listing.component.scss']
})
export class CoursesCardsListingComponent implements OnInit, OnDestroy{

  courses: Course[];
  favourites: FavouriteCourse[];
  destroy$ = new Subject<boolean>();
  formGroup: FormGroup;
  favouriteCourses: Set<number> = new Set<number>();

  constructor(private courseService: CourseService,
              private fb: FormBuilder,
              private favouritesCoursesService: FavouritesCoursesService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCourses();
    this.formGroup = this.fb.group({
      search: ['']
    });
  }

  populateSet(): void{
    this.favourites.forEach(fav => {
      this.favouriteCourses.add(fav.courseId);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSearch(): void {
    // get title from form
    const searchValue = this.formGroup.controls.search.value;

    this.getCourses(searchValue);
  }

  onClearSearch(): void {
    this.formGroup.get('search').setValue(null);

    this.getCourses();
  }

  onDelete(id: number): void {
    this.courseService.deleteCourse(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getCourses();
    });
  }

  navigateToView(id: number){
    this.router.navigate([`/courses/view/${id}`]);
  }

  onAddToFavourites(courseId: number): void{
    this.favouritesCoursesService.getFavourites().pipe(
      map((response: FavouriteCourse[]) => response.find(favCourse => favCourse.courseId === courseId)),
      takeUntil(this.destroy$)
    ).subscribe(favCourseResponse => {
      if (favCourseResponse) {
        // this.errorMessage = 'Email has already been taken! Try another one!';
        return;
      }

      this.favouritesCoursesService.addToFavourites(courseId).pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    });
  }

  onRemoveFromFavourites(courseId: number): void{
    this.favouritesCoursesService.getSelectedFavourite(courseId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.removeFromFavourites(response.id);
    });
  }

  private removeFromFavourites(favCourseId: number){
    this.favouritesCoursesService.removeFromFavourites(favCourseId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.favouriteCourses.clear();
      console.log(response);
      this.getFavourites();
    });
  }

  private getCourses(searchValue?: string): void {
    this.courseService.getCourses(searchValue).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      console.log(response);
      this.courses = response;
      this.getFavourites();
    }, error => {
      console.log(error);
    });
  }

  private getFavourites(): void {
    this.favouritesCoursesService.getFavourites().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.favourites = response;
      this.populateSet();
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  openFormModal() {
    const modalRef = this.modalService.open(CoursesReactiveFormComponent);

    modalRef.result.then(() => {
     this.getCourses();
    }).catch((error) => {
      console.log(error);
    });
  }
}
