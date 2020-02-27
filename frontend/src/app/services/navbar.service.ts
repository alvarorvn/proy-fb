import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  URL: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getSoliRecibidas() {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/get-soli-recibidas`);
  }
}
