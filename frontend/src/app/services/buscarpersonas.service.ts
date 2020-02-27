import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BuscarpersonasService {
  URL: string = 'http://localhost:3000';
  constructor(
    private http: HttpClient
  ) { }

  getPersonas(usr_busq) {
    return this.http.get<any>(`${this.URL}/personas/${usr_busq}`);
  }
  getEventos(usr_busq) {
    return this.http.get<any>(`${this.URL}/eventos/${usr_busq}`);
  }
  getPaginas(usr_busq) {
    return this.http.get<any>(`${this.URL}/paginas/${usr_busq}`);
  }

  }