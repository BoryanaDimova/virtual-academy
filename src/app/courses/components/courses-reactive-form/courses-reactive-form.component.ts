import {Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Course} from '../../models/course.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CourseService} from '../../services/course.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courses-reactive-form',
  templateUrl: './courses-reactive-form.component.html',
  styleUrls: ['./courses-reactive-form.component.scss']
})
export class CoursesReactiveFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  @Input() course: Course;
  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private courseService: CourseService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    const course = this.formGroup.value;

    this.courseService.saveCourse(course).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.closeModal();
    });
  }

  private buildForm(): void {
    if (!this.course) {
      const date = new Date();
      this.course = {
        ratingsCount: 0,
        ratingsSum: 0,
        title: '',
        description: '',
        datePublished: new Date(date.getFullYear(), date.getMonth(), date.getDate())
      };
    }

    this.formGroup = this.fb.group({
      id: [this.course.id],
      title: [this.course.title, [Validators.required]],
      description: [this.course.description, [Validators.required]],
      datePublished: [this.course.datePublished],
      imageUrl: [this.course.imageUrl],
      ratingsSum: [this.course.ratingsSum],
      ratingsCount: [this.course.ratingsCount]
    });
  }

  closeModal() {
    this.activeModal.close(this.formGroup.value);
  }
}
