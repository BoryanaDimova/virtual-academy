import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { NavigationComponent } from './_components/navigation/navigation.component';
import { RegistrationComponent } from './_components/registration/registration.component';
import { AlertComponent } from './_components/alert/alert.component';
import { HomeComponent } from './_components/home/home.component';
import { CoursesComponent } from './_components/courses/courses.component';

const routes: Route[] = [
  {
  path: 'home',
  component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'all-courses',
    component: CoursesComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    RegistrationComponent,
    AlertComponent,
    HomeComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
