import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerchatsService {

  URL: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(
    private http: HttpClient, private router: Router
  ) { }

  signUp(user) {
    return this.http.post<any>(`${this.URL}/register`, user);
  }

  login(user) {
    return this.http.post<any>(this.URL + '/login', user);
  }

  getUsers() {
    return this.http.get<any>(this.URL);
  }

  getUserLogin(id) {
    return this.http.post<any>(this.URL, id);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token;
  }

  getId() {
    let id = localStorage.getItem('id');
    return id;
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
