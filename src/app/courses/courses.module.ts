import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormatPipe} from './pipes/format.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {CoursesRoutingModule} from './courses-routing.module';
import {CoursesComponent} from './courses.component';
import {CourseCardItemComponent} from './components/course-card-item/course-card-item.component';
import {CoursesCardsListingComponent} from './components/courses-cards-listing/courses-cards-listing.component';
import {CoursesReactiveFormComponent} from './components/courses-reactive-form/courses-reactive-form.component';
import {FavouriteButtonComponent} from './components/favourite-button/favourite-button.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FavouriteCoursesListComponent } from './components/favourite-courses-list/favourite-courses-list.component';
import { CourseViewItemComponent } from './components/course-view-item/course-view-item.component';
import {StarRatingModule} from 'angular-rating-star';
import {RatingModule} from 'ng-starrating';


@NgModule({
  entryComponents: [
    CoursesCardsListingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    NgbModule,
    StarRatingModule,
    RatingModule
  ],
  declarations: [
    FormatPipe,
    CoursesComponent,
    CoursesCardsListingComponent,
    CoursesReactiveFormComponent,
    CourseCardItemComponent,
    FavouriteButtonComponent,
    FavouriteCoursesListComponent,
    CourseViewItemComponent
  ],
  exports: [
    FavouriteCoursesListComponent,
    FormatPipe
  ],
  bootstrap: [CoursesReactiveFormComponent]
})
export class CoursesModule {
}
