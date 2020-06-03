import {Injectable} from '@angular/core';
import {Course} from '../models/course.interface';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  readonly url = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  private getAllCourses(): Observable<Course[]>{
    // tslint:disable-next-line:ban-types
    return this.http.get<Course[]>(`${this.url}`);
  }

  getCourses(searchValue?: string): Observable<Course[]>{
    if (!searchValue){
      return this.getAllCourses();
    }

    return this.getAllCourses().pipe(
      // tslint:disable-next-line:max-line-length
      map((response: Course[]) => response.filter(course => course.title.toLowerCase().includes(searchValue) || course.description.toLowerCase().includes(searchValue)))
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`);
  }

  saveCourse(course: Course): Observable<Course> {
    if (course.id) {
      return this.updateCourse(course);
    } else {
      return this.addCourse(course);
    }
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.url}/${id}`);
  }

  private addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.url, course);
  }

  private updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${course.id}`, course);
  }
}
