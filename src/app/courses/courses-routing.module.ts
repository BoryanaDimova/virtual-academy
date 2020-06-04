import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CoursesCardsListingComponent} from './components/courses-cards-listing/courses-cards-listing.component';
import {CoursesComponent} from './courses.component';
import {FavouriteCoursesListComponent} from './components/favourite-courses-list/favourite-courses-list.component';
import {CourseViewItemComponent} from './components/course-view-item/course-view-item.component';


const routes: Route[] = [
  {
    path: '',
    component: CoursesComponent,

    children: [
      {
        path: 'courses-cards-list',
        component: CoursesCardsListingComponent
      },
      {
        path: 'favourite-courses',
        component: FavouriteCoursesListComponent
      },
      {
        path: 'view/:id',
        component: CourseViewItemComponent
      },
      {
        path: '',
        redirectTo: 'courses-cards-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {
}
