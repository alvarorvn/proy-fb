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

  // EMPLEOS
  addEmpleo(empleo) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/biografia/add-empleo`, empleo);
  }

  getEmpleos(perfil_id) {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/get-empleo`);
  }

  updateEmpleos(perfil_id, empleo) {
    return this.http.put<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/update-empleo/${empleo['empleo_id']}`, empleo);
  }

  deleteEmpleos(perfil_id, empleo_id) {
    return this.http.delete<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/delete-empleo/${empleo_id}`);
  }
  // FIN EMPLEOS

  // APTITUDES
  addAptitud(aptitud) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/biografia/add-aptitud`, aptitud);
  }

  getAptitud(perfil_id) {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/get-aptitudes`);
  }

  updateAptitud(perfil_id, aptitud) {
    return this.http.put<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/update-aptitud/${aptitud['habprof_id']}`, aptitud);
  }

  deleteAptitud(perfil_id, aptitud_id) {
    return this.http.delete<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/delete-aptitud/${aptitud_id}`);
  }
  // FIN APTITUDES

  // ESTUDIOS
  addEstudio(estudio) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/biografia/add-estudio`, estudio);
  }

  getEstudio(perfil_id) {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/get-estudios`);
  }

  updateEstudio(perfil_id, estudio) {
    return this.http.put<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/update-estudio/${estudio['univ_id']}`, estudio);
  }

  deleteEstudio(perfil_id, univ_id) {
    return this.http.delete<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/delete-estudio/${univ_id}`);
  }
  // FIN ESTUDIOS
}
