import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators/';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private http: HttpClient) { }

  signUp(user): Observable<any> {

    //return this.http.post<any>(this.URL + '/register', user);
    return this.http.post<any>(`${this.URL}/register`, user).pipe(tap(
      (res: any) => {
        if (res) {
          this.saveToken(res.token);
        }
      }
    ))
  }

  login(user) {
    //return this.http.post<any>(this.URL + '/login', user);
    return this.http.post<any>(`${this.URL}/login`, user).pipe(tap(
      (res: any) => {
        if (res) {
          this.saveToken(res.token);
        }
      }
    ))
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token;
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  /*getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }*/
}
