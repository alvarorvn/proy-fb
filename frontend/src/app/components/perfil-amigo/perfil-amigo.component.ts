import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from "ngx-toastr";

import { AuthService } from "../../services/auth.service";
import { PerfilAmigoService } from "../../services/perfil-amigo.service";
import { NavbarService } from "../../services/navbar.service";

declare var jQuery: any;

@Component({
  selector: 'app-perfil-amigo',
  templateUrl: './perfil-amigo.component.html',
  styleUrls: ['./perfil-amigo.component.css']
})
export class PerfilAmigoComponent implements OnInit {

  amigo_id = "";
  perfil_amigo = {};

  // Listas de cosas
  seguidores: Array<Object> = [];
  seguidos: Array<Object> = [];
  amigos: Array<Object> = [];
  empleos: Array<Object> = [];
  aptitudes: Array<Object> = [];
  estudios: Array<Object> = [];
  telefonos: Array<Object> = [];
  direcciones: Array<Object> = [];
  apodos: Array<Object> = [];
  soliEnviadas: Array<Object> = [];
  solicitudesRecibidas: Array<Object> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private perfAmigo: PerfilAmigoService,
    private toastr: ToastrService,
    private navbarService: NavbarService
  ) {
    this.amigo_id = this.route.snapshot.params.idamigo;
  }

  ngOnInit() {
    this.getPerfilAmigo();
    this.getAmigos();
    this.getSeguidores();
    this.getSeguidos();
    this.getSoliEnviadas();
    this.getSoliRecibidas();
    setTimeout(() => {
      this.getEmpleos();
      this.getAptitudes();
      this.getEstudios();
      this.getTelefonos();
      this.getApodos();
      this.getDirecciones();
      console.log(this.solicitudesRecibidas);
    }, 1000);
    setTimeout(() => {
      this.JqueryFunciones();
    }, 1500);
  }

  tieneSolicitud() {
    let tiene = false;
    this.soliEnviadas.forEach(soli => {
      if (soli['usuario_id_recepta'] == this.amigo_id && soli['solic_estado'] == false) {
        tiene = true;
      }
    });
    return tiene;
  }

  tieneSolicituRecibida() {
    let tiene = false;
    this.solicitudesRecibidas.forEach(soli => {
      if (soli['usuario_id_envia'] == this.amigo_id && soli['solic_estado'] == false) {
        tiene = true;
      }
    });
    return tiene;
  }

  esAmigo() {
    let esAmigo = false;
    this.amigos.forEach(amig => {
      if (amig['usuario_id_amigo'] == this.authService.getId()) {
        esAmigo = true;
      }
    });
    return esAmigo;
  }

  getSoliRecibidas() {
    this.navbarService.getSoliRecibidas().subscribe(res => {
      if (res.tipo == 'error') {
        this.solicitudesRecibidas = res.result;
      } else {
        this.solicitudesRecibidas = res;
      }
    })
  }

  siguiendo() {
    let siguiendo = false;
    this.seguidores.forEach(seguidor => {
      if (seguidor['usuario_id'] == this.authService.getId()) {
        siguiendo = true;
      }
    });
    return siguiendo;
  }

  getPerfilAmigo() {
    this.authService.getUserLogin({ usuario_id: this.amigo_id }).subscribe(res => {
      this.perfil_amigo = res;
    })
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;charset=utf-8;base64, ${url}`);
  }

  getAmigos() {
    this.perfAmigo.getAmigos(this.amigo_id).subscribe(res => {
      if (res.tipo == 'error') {
        this.amigos = res.result;
      } else {
        this.amigos = res;
      }
    })
  }

  getSeguidores() {
    this.perfAmigo.getSeguidores(this.amigo_id).subscribe(res => {
      if (res.tipo == 'error') {
        this.seguidores = res.result;
      } else {
        this.seguidores = res;
      }
    })
  }

  getSeguidos() {
    this.perfAmigo.getSeguidos(this.amigo_id).subscribe(res => {
      if (res.tipo == 'error') {
        this.seguidos = res.result;
      } else {
        this.seguidos = res;
      }
    })
  }

  getEmpleos() {
    this.perfAmigo.getEmpleos(this.perfil_amigo['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.empleos = res.result;
      } else {
        this.empleos = res;
      }
    })
  }

  getAptitudes() {
    this.perfAmigo.getAptitud(this.perfil_amigo['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.aptitudes = res.result;
      } else {
        this.aptitudes = res;
      }
    })
  }

  getEstudios() {
    this.perfAmigo.getEstudio(this.perfil_amigo['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.estudios = res.result;
      } else {
        this.estudios = res;
      }
    })
  }

  getTelefonos() {
    this.perfAmigo.getTelf(this.perfil_amigo['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.telefonos = res.result;
      } else {
        this.telefonos = res;
      }
    })
  }

  getDirecciones() {
    this.perfAmigo.getDireccion(this.perfil_amigo['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.direcciones = res.result;
      } else {
        this.direcciones = res;
      }
    })
  }

  getApodos() {
    this.perfAmigo.getApodo(this.perfil_amigo['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.apodos = res.result;
      } else {
        this.apodos = res;
      }
    })
  }

  follow() {
    let obj = {
      seguido_tipo: "Usuario",
      pagina_id: null,
      usuario_id_sigue: this.amigo_id,
      usuario_id: this.authService.getId()
    }
    this.perfAmigo.addSeguidor(obj).subscribe(res => {
      if (res.tipo == 'error') {
        this.toastr.error(res.message, "Error");
      } else {
        this.toastr.success(res.message, "Éxito");
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([`${this.authService.getId()}/biografia/${this.amigo_id}`]);
      }
    })
  }

  dejarSeguir() {
    let obj = {
      usuario_id_sigue: this.amigo_id,
      usuario_id: this.authService.getId()
    }
    this.perfAmigo.deleteSeguidor(obj).subscribe(res => {
      if (res.tipo == 'error') {
        this.toastr.error(res.message, "Error");
      } else {
        this.toastr.success(res.message, "Éxito");
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([`${this.authService.getId()}/biografia/${this.amigo_id}`]);
      }
    })
  }

  enviarSolicitud() {
    let obj = {
      solic_estado: false,
      usuario_id_recepta: this.amigo_id,
      usuario_id_envia: this.authService.getId()
    }
    this.perfAmigo.addSoli(obj).subscribe(res => {
      if (res.tipo == 'error') {
        this.toastr.error(res.message, "Error");
      } else {
        this.toastr.success(res.message, "Éxito");
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([`${this.authService.getId()}/biografia/${this.amigo_id}`]);
      }
    })
  }

  getSoliEnviadas() {
    this.perfAmigo.getSoliEnviadas().subscribe(res => {
      if (res.tipo == 'error') {
        this.soliEnviadas = res.result;
      } else {
        this.soliEnviadas = res;
      }
    })
  }

  cancelarSolicitud() {
    let obj = {
      usuario_id_recepta: this.amigo_id,
      usuario_id_envia: this.authService.getId()
    }
    this.perfAmigo.deleteSolicitud(obj).subscribe(res => {
      if (res.tipo == 'error') {
        this.toastr.error(res.message, "Error");
      } else {
        this.toastr.success(res.message, "Éxito");
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([`${this.authService.getId()}/biografia/${this.amigo_id}`]);
      }
    })
  }

  JqueryFunciones() {
    (function ($) {
      $(document).ready(function () {

        // Cambio de navs
        $('#enlamigos').on('click', () => {
          // NAV ITEMS
          $('#nvbio').removeClass('active');
          $('#nvamigos').addClass('active');

          $('#nvallamigos').removeClass('active');
          $('#nvseguidores').addClass('active');

          // TABS
          $('#biografia').removeClass('active');
          $('#amigos').addClass('active');

          $('#allamigos').removeClass('active');
          $('#seguidores').addClass('active');
        })
      });
    })(jQuery);
  }
}
