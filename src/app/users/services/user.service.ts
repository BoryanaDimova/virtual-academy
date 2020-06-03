import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../core/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getUsers(searchValue?: string): Observable<User[]>{
    if (searchValue) {
      let params = new HttpParams();
      params = params.append('email', searchValue);

      return this.http.get<User[]>(this.url, {
        params
      });
    }

    return this.http.get<User[]>(this.url);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  saveUser(user: User): Observable<User> {
    if (user.id) {
      return this.updateUser(user);
    } else {
      return this.addUser(user);
    }
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

  private addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  private updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }
}
