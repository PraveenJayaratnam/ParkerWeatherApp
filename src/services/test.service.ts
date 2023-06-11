import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  listUser(): Observable<any> {
    return this.http.get<any[]>('https://reqres.in/api/users');
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>('https://reqres.in/api/users', user);
  }
}
