import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserReactiveFormComponent} from './components/user-reactive-form/user-reactive-form.component';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {CoursesModule} from '../courses/courses.module';

@NgModule({
  entryComponents: [
    UserReactiveFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsersRoutingModule,
    CoursesModule,
    FormsModule
  ],
  declarations: [
    UsersComponent,
    UserReactiveFormComponent,
    UsersTableComponent
  ]
})

export class UsersModule {
}
