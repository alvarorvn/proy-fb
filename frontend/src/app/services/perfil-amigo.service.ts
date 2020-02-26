import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PerfilAmigoService {

  URL: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getSeguidores(id_amigo) {
    return this.http.get<any>(`${this.URL}/${id_amigo}/seguidores`);
  }

  getAmigos(id_amigo) {
    return this.http.get<any>(`${this.URL}/${id_amigo}/amigos`);
  }

  getSeguidos(id_amigo) {
    return this.http.get<any>(`${this.URL}/${id_amigo}/seguidos`);
  }

  // EMPLEOS  

  getEmpleos(perfil_id) {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/get-empleo`);
  }

  // FIN EMPLEOS

  // APTITUDES

  getAptitud(perfil_id) {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/get-aptitudes`);
  }

  // FIN APTITUDES

  // ESTUDIOS

  getEstudio(perfil_id) {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/get-estudios`);
  }

  // FIN ESTUDIOS


  // TELEFONOS 

  getTelf(perfil_id) {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/get-telf`);
  }

  // FIN TELEFONOS

  // DIRECCION

  getDireccion(perfil_id) {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/get-direccion`);
  }

  // FIN DIRECCION   

  // APODOS  

  getApodo(perfil_id) {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/biografia/${perfil_id}/get-apodo`);
  }

  // FIN APODOS

  // SEGUIDOR

  addSeguidor(seguidor) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/biografia/add-seguidor`, seguidor);
  }

  deleteSeguidor(seguidor) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/biografia/delete-seguidor`, seguidor);
  }

  // FIN SEGUIDOR

  // SOLICITUD AMISTAD
  addSoli(soli) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/biografia/add-soli`, soli);
  }

  getSoliEnviadas() {
    return this.http.get<any>(`${this.URL}/${this.authService.getId()}/get-soli-env`);
  }

  deleteSolicitud(soli) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/biografia/delete-soli`, soli);
  }
  
  // FIN SOLICITUD AMISTAD
}
