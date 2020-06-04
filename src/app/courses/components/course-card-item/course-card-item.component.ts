import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../../models/course.interface';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-card-item',
  templateUrl: './course-card-item.component.html',
  styleUrls: ['./course-card-item.component.scss']
})
export class CourseCardItemComponent implements OnInit {

  @Input() course: Course;
  @Input() favourite: boolean;
  @Input() isCurrentUserAdmin: boolean;
  @Output() courseRemoved = new EventEmitter<number>();
  @Output() addToFavourites = new EventEmitter<number>();
  @Output() removeFromFavourites = new EventEmitter<number>();
  @Output() navigateToViewEvent = new EventEmitter<number>();

  constructor(private router: Router) {
    this.course = {
      ratingsCount: 0,
      ratingsSum: 0,
      title: '',
      description: '',
      datePublished: new Date(),
      imageUrl: ''
    };
  }

  ngOnInit(): void {
  }

  onRemoveClick(): void {
    this.courseRemoved.emit(this.course.id);
  }

  navigateToView(){
    this.navigateToViewEvent.emit(this.course.id);
    // this.router.navigate(['/courses/view/', this.course.id]);
  }

  onFavouriteButtonClicked(isFavourite: boolean){
    if (isFavourite) {
      this.addToFavourites.emit(this.course.id);
    }else {
      this.removeFromFavourites.emit(this.course.id);
    }
  }

}
