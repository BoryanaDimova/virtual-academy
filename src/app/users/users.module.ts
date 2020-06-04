import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PasswordFormatPipe} from './pipes/passwordFormat.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserReactiveFormComponent} from './components/user-reactive-form/user-reactive-form.component';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {CoursesModule} from '../courses/courses.module';
import {SharedModule} from '../shared/shared.module';


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
    FormsModule,
    SharedModule
  ],
  declarations: [
    PasswordFormatPipe,
    UsersComponent,
    UserReactiveFormComponent,
    UsersTableComponent
  ],
  exports: [
    PasswordFormatPipe
  ]
})

export class UsersModule {
}
