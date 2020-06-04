import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../../models/course.interface';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {CourseService} from '../../services/course.service';
import {FormControl, Validators} from '@angular/forms';
import {CourseRatingsService} from '../../services/courseRatings.service';
import {CourseRates} from '../../models/courseRates.interface';
import {CoursesReactiveFormComponent} from '../courses-reactive-form/courses-reactive-form.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-course-view-item',
  templateUrl: './course-view-item.component.html',
  styleUrls: ['./course-view-item.component.scss']
})
export class CourseViewItemComponent implements OnInit, OnDestroy {

  isCurrentUserAdmin: boolean;
  @Input() course: Course;
  rateRecord: CourseRates;
  destroy$ = new Subject<boolean>();
  ctrl = new FormControl(null, Validators.required);

  constructor(private router: Router,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private ratingService: CourseRatingsService,
              private modalService: NgbModal,
              private authService: AuthenticationService) {
    this.course = {
      ratingsCount: 0,
      ratingsSum: 0,
      datePublished: undefined,
      title: '',
      description: '',
    };
    this.rateRecord = {
      courseId: 0,
      rating: 0,
      userId: 0
    };
  }

  ngOnInit(): void {
    this.checkIfLoggedUserIsAdmin();
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if (params.id) {
        this.course.id = params.id;
        this.rateRecord.courseId = parseInt(params.id);
        this.getCourse();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getCurrentUserRate() {
    this.ratingService.getSelectedUserRatingByCourseId(this.course.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      if (!response) {
        return;
      }
      this.rateRecord = response;
      this.ctrl.setValue(response.rating);
    });
  }

  onRateChanged() {
    this.course.ratingsSum += (this.rateRecord.id ? (this.ctrl.value - this.rateRecord.rating) : this.ctrl.value);
    this.course.ratingsCount += (this.rateRecord.id ? 0 : 1);
    this.rateRecord.rating = this.ctrl.value;
    this.saveRate();
  }

  saveRate() {
    this.ratingService.saveRating(this.rateRecord).pipe(
      takeUntil(this.destroy$)
    ).subscribe(rateResponse => {
      this.rateRecord = rateResponse;
      this.updateCourse();
    });
  }

  updateCourse() {
    this.courseService.saveCourse(this.course).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.course = response;
    });
  }

  getCourse() {
    this.courseService.getCourseById(this.course.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.course = response;
      this.getCurrentUserRate();
    });
  }

  openFormModal() {
    if (!this.isCurrentUserAdmin) {
      return;
    }

    const modalRef = this.modalService.open(CoursesReactiveFormComponent, {
      size: 'lg',
      centered: true,
      backdrop: true,
      keyboard: false,
      windowClass: 'modal-xl'
    });
    modalRef.componentInstance.course = this.course;
    modalRef.result.then(() => {
      this.getCourse();
    }).catch((error) => {
      console.log(error);
    });
  }

  checkIfLoggedUserIsAdmin() {
    this.authService.isLoggedUserAdmin().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => this.isCurrentUserAdmin = response);
  }
}
