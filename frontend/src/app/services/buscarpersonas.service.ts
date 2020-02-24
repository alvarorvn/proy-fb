import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class BuscarpersonasService {
  URL: string = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getPersonas(usr_busq) {
    return this.http.post<any>(`${this.URL}/personas`, usr_busq);
  }


  updatePerfilPhoto(photo) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/update-perfil-photo`, photo);
  }

  updatePortadaPhoto(photo) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/update-portada-photo`, photo);
  }
}
