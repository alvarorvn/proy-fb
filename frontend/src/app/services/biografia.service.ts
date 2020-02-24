import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class BiografiaService {

  URL: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getSeguidores() {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/seguidos`);
  }

  updatePerfilPhoto(photo) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/update-perfil-photo`, photo);
  }
}
