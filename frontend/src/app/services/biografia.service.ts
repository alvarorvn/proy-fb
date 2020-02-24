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
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/seguidores`);
  }

  getAmigos() {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/amigos`);
  }

  getSeguidos() {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/seguidos`);
  }

  updatePerfilPhoto(photo) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/update-perfil-photo`, photo);
  }

  updatePortadaPhoto(photo) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/update-portada-photo`, photo);
  }

  addEmpleo(empleo) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/biografia/add-empleo`, empleo);
  }

  getEmpleos(perfil_id) {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/get-empleo`);
  }
}
