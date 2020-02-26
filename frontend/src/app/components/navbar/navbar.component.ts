import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { NavbarService } from "../../services/navbar.service";
import { BiografiaService } from "../../services/biografia.service";
import { PerfilAmigoService } from "../../services/perfil-amigo.service";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

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
    private navbarService: NavbarService,
    private router: Router,
    private perfAmigo: PerfilAmigoService,
    private toastr: ToastrService,
    private biogService: BiografiaService
  ) { }

  ngOnInit() {
    if (this.authService.getId() && this.authService.getToken()) {
      this.getUserLogin(this.authService.getId());
    };
    setTimeout(() => {
      let getSolRec = setInterval(() => {
        if (!this.authService.getId() && !this.authService.getToken()) {
          this.pararBucle(getSolRec)
        } else {
          this.getSoliRecibidas();
        }
      }, 500);
    }, 500);
  }

  toUser(userid) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`${this.authService.getId()}/biografia/${userid}`]);
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

  aceptarSoli(amigo_id) {
    let f = new Date();
    let obj = {
      amig_fecha: `${f.getDate()}-${f.getMonth()}-${f.getFullYear()}`,
      usuario_id: this.authService.getId(),
      usuario_id_amigo: amigo_id
    }

    this.biogService.addAmigo(obj).subscribe(res => {
      if (res.tipo == 'error') {
        this.toastr.error(res.message, "Error");
      } else {
        this.toastr.success(res.message, "Éxito");
        let obj_soli = {
          usuario_id_recepta: this.authService.getId(),
          usuario_id_envia: amigo_id
        }
        this.perfAmigo.deleteSolicitud(obj_soli).subscribe(res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([this.router.url]);
          }
        })
      }
    })
  }

  cancelarSolicitudDesdeMiPerfil(amigo_id) {
    let obj = {
      usuario_id_recepta: this.authService.getId(),
      usuario_id_envia: amigo_id
    }
    this.perfAmigo.deleteSolicitud(obj).subscribe(res => {
      if (res.tipo == 'error') {
        this.toastr.error(res.message, "Error");
      } else {
        this.toastr.success(res.message, "Éxito");
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([`${this.authService.getId()}/biografia/${amigo_id}`]);
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
