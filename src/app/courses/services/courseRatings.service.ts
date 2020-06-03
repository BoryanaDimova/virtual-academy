import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../core/models/user.interface';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {CourseRates} from '../models/courseRates.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseRatingsService {
  readonly loggedUser: User;
  readonly url = 'http://localhost:3000/ratings';
  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.loggedUser = authService.getLoggedUser();
  }

  private getAllRates(): Observable<CourseRates[]>{
    return this.http.get<CourseRates[]>(this.url);
  }

  getSelectedUserRatingByCourseId(courseId: number): Observable<CourseRates>{
    return this.getAllRates().pipe(
      // tslint:disable-next-line:max-line-length
      map((response: CourseRates[]) => response.find(rate => rate.userId === this.loggedUser.id && rate.courseId === courseId))
    );
  }

  saveRating(rateRecord: CourseRates): Observable<CourseRates> {
    if (rateRecord.id) {
      return this.updateRate(rateRecord);
    } else {
      return this.addRate(rateRecord);
    }
  }

  addRate(rateRecord: CourseRates): Observable<CourseRates> {
    rateRecord.userId = this.loggedUser.id;
    return this.http.post<CourseRates>(this.url, rateRecord);
  }

  updateRate(rateRecord: CourseRates): Observable<CourseRates> {
    return this.http.put<CourseRates>(`${this.url}/${rateRecord.id}`, rateRecord);
  }
}
