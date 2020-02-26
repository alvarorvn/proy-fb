import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  bucleAmigos;
  URL: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Registro
  signUp(user) {
    return this.http.post<any>(`${this.URL}/register`, user);
  }

  // Inicio de sesion
  login(user) {
    return this.http.post<any>(this.URL + '/login', user);
  }

  // Obtener todos los usuarios
  getUsers() {
    return this.http.get<any>(this.URL);
  }

  // Obtener usuario de sesion actual
  getUserLogin(id) {
    return this.http.post<any>(this.URL, id);
  }

  // verifica si el usuario que inicio sesion tiene token
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  // Obtiene token de usuario que inicio sesion
  getToken() {
    let token = localStorage.getItem('token');
    return token;
  }

  // Obtiene id de usuario que inicio sesion
  getId() {
    let id = localStorage.getItem('id');
    return id;
  }

  //updateEstado de conexion
  cambiarEstadoConexion(usuario_conectado, iduser) {
    return this.http.put<any>(`${this.URL}/${iduser}/est`, usuario_conectado);
  }

  // Cerrar sesion
  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
