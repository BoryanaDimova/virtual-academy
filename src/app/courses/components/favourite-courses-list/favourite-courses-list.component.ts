import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../../models/course.interface';
import {Subject} from 'rxjs';
import {CourseService} from '../../services/course.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FavouritesCoursesService} from '../../services/favouritesCourses.service';
import {filter, map, takeUntil} from 'rxjs/operators';
import {FavouriteCourse} from '../../models/favouriteCourse.interface';
import {User} from '../../../core/models/user.interface';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-favourite-courses-list',
  templateUrl: './favourite-courses-list.component.html',
  styleUrls: ['./favourite-courses-list.component.scss']
})
export class FavouriteCoursesListComponent implements OnInit, OnDestroy {

  courses: Course[];
  isCurrentUserAdmin: boolean;
  destroy$ = new Subject<boolean>();
  favourites: FavouriteCourse[];
  favouriteCourses: Set<number> = new Set<number>();

  constructor(private courseService: CourseService,
              private fb: FormBuilder,
              private favouritesCoursesService: FavouritesCoursesService,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.checkIfLoggedUserIsAdmin();
    this.getFavourites();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onRemoveFromFavourites(courseId: number): void {
    this.favouritesCoursesService.getSelectedFavourite(courseId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.removeFromFavourites(response.id);
    });
  }

  private removeFromFavourites(favCourseId: number) {
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
      map((response: Course[]) => response.filter(course => this.favouriteCourses.has(course.id)))
    ).subscribe(response => {
      this.courses = response;
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
    }, error => {
      console.log(error);
    });
  }

  populateSet(): void {
    this.favourites.forEach(fav => {
      this.favouriteCourses.add(fav.courseId);
    });

    this.getCourses();
  }

  navigateToView(id: number) {
    this.router.navigate([`/courses/view/${id}`]);
  }

  checkIfLoggedUserIsAdmin() {
    this.authService.isLoggedUserAdmin().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => this.isCurrentUserAdmin = response);
  }
}

