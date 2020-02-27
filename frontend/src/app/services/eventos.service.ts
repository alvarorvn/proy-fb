import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  URL: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }
    
  addEvento(evento) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/eventos/add-evento`, evento);
  }

  obtEvento(evento) {
    return this.http.post<any>(`${this.URL}/${this.authService.getId()}/eventos/get-evento`, evento);
  }




}
