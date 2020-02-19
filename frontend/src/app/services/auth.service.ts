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

  signUp(user) {
    return this.http.post<any>(`${this.URL}/register`, user);
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

  getUsers() {
    return this.http.get<any>(this.URL);
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

  publicar(texto) {
    return this.http.post<any>(`${this.URL}/publicar`, texto).pipe(tap(
      (res: any) => {
        if (res) {
          console.log(res);
        }
      }
    ))
  }
}
