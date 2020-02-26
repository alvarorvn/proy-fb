import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { NavbarService } from "../../services/navbar.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class NavbarComponent implements OnInit {

  userLogin = {};
  persona = {
    usr_busq: ""
  };

  // Lista de objetos
  soliRecibidas: Array<Object> = [];

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private navbarService: NavbarService
  ) { }

  ngOnInit() {
    if (this.authService.getId() && this.authService.getToken()) {
      this.getUserLogin(this.authService.getId());
    };
    let getSolRec = setInterval(() => {
      if (!this.authService.getId() && !this.authService.getToken()) {
        this.pararBucle(getSolRec)
      } else {
        this.getSoliRecibidas();
        console.log(this.soliRecibidas);
      }
    }, 1000);
  }

  pararBucle(nombre) {
    clearInterval(nombre)
  }

  salir() {
    this.authService.cambiarEstadoConexion({ usuario_conectado: false }, this.userLogin['usuario_id']).subscribe();
    setTimeout(() => {
      this.authService.logout();
    }, 500);
  }

  getUserLogin(id) {
    this.authService.getUserLogin({ usuario_id: id }).subscribe(res => {
      if (res.tipo != 'error') {
        this.userLogin = res;
      }
    })
  }

  getSoliRecibidas() {
    this.navbarService.getSoliRecibidas().subscribe(res => {
      if (res.tipo == 'error') {
        this.soliRecibidas = res.result;
      } else {
        this.soliRecibidas = res;
      }
    })
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;charset=utf-8;base64, ${url}`);
  }

  onSearchChange(searchValue: string): void {
    localStorage.setItem('usr_busq', searchValue);
  }

}
