import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FavouriteCourse} from '../models/favouriteCourse.interface';
import {map} from 'rxjs/operators';
import {User} from '../../core/models/user.interface';
import {AuthenticationService} from '../../auth/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesCoursesService {
  readonly loggedUser: User;
  readonly url = 'http://localhost:3000/favouriteCourses';
  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.loggedUser = authService.getLoggedUser();
  }

  getFavourites(): Observable<FavouriteCourse[]>{
    return this.getAllFavourites().pipe(
      // tslint:disable-next-line:max-line-length
      map((response: FavouriteCourse[]) => response.filter(favourite => favourite.userId === this.loggedUser.id))
    );
  }

  private getAllFavourites(): Observable<FavouriteCourse[]>{
    return this.http.get<FavouriteCourse[]>(this.url);
  }

  getSelectedFavourite(courseId: number): Observable<FavouriteCourse>{
    return this.getAllFavourites().pipe(
      // tslint:disable-next-line:max-line-length
      map((response: FavouriteCourse[]) => response.find(favourite => favourite.userId === this.loggedUser.id && favourite.courseId === courseId))
    );
  }

  removeFromFavourites(favCourseId: number): Observable<FavouriteCourse> {
      return this.http.delete<FavouriteCourse>(`${this.url}/${favCourseId}`);
  }

  addToFavourites(courseId: number): Observable<FavouriteCourse> {
    let newFavourite: FavouriteCourse;
    newFavourite = {
      userId: this.loggedUser.id,
      courseId
    };
    return this.http.post<FavouriteCourse>(this.url, newFavourite);
  }
}
