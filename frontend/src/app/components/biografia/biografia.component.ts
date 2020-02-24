import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { BiografiaService } from '../../services/biografia.service';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

declare var jQuery: any;

@Component({
  selector: 'app-biografia',
  templateUrl: './biografia.component.html',
  styleUrls: ['./biografia.component.css']
})
export class BiografiaComponent implements OnInit {

  // Objetos
  userLogin = {};
  empleo = {
    empleo_empresa: "",
    empleo_puesto: "",
    empleo_detalle: "",
    empleo_fechainicio: "",
    empleo_fechafin: "",
    perfilusu_id: ""
  };

  fileUpload;
  portadaUpload;

  // Lista de cosas
  seguidores: Array<Object> = [];
  seguidos: Array<Object> = [];
  amigos: Array<Object> = [];
  empleos: Array<Object> = [];

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private biogService: BiografiaService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    if (this.authService.getId() && this.authService.getToken()) {
      this.getUserLogin(this.authService.getId());
    };
    this.getSeguidores();
    this.getAmigos();
    this.getSeguidos();
    setTimeout(() => {
      this.JqueryFunciones();
      this.getEmpleos();
    }, 500);
  }

  getUserLogin(id) {
    this.authService.getUserLogin({ usuario_id: id }).subscribe(res => {
      if (res.tipo != 'error') {
        this.userLogin = res;
      }
    })
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;charset=utf-8;base64, ${url}`);
  }

  getSeguidores() {
    this.biogService.getSeguidores().subscribe(res => {
      if (res.tipo == 'error') {
        this.seguidores = res.result;
      } else {
        this.seguidores = res;
      }
    })
  }

  getAmigos() {
    this.biogService.getAmigos().subscribe(res => {
      if (res.tipo == 'error') {
        this.amigos = res.result;
      } else {
        this.amigos = res;
      }
    })
  }

  getSeguidos() {
    this.biogService.getSeguidos().subscribe(res => {
      if (res.tipo == 'error') {
        this.seguidos = res.result;
      } else {
        this.seguidos = res;
      }
    })
  }

  updatePerfilPhoto() {
    const formData = new FormData();
    formData.append('file', this.fileUpload);
    this.biogService.updatePerfilPhoto(formData).subscribe(res => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([`${this.authService.getId()}/biografia`]);
    })
  }

  updatePortadaPhoto() {
    const formData = new FormData();
    formData.append('file', this.portadaUpload);
    this.biogService.updatePortadaPhoto(formData).subscribe(res => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([`${this.authService.getId()}/biografia`]);
    })
  }

  onFileChange(e) {
    this.fileUpload = e.target.files[0];
    this.updatePerfilPhoto();
  }

  onPortadaChange(e) {
    this.portadaUpload = e.target.files[0];
    this.updatePortadaPhoto();
  }

  openForm() {
    this.JqueryFunciones();
  }

  guardarEmpleo() {
    this.empleo.perfilusu_id = this.userLogin['perfilusu_id'];
    this.biogService.addEmpleo(this.empleo).subscribe(res => {
      if (res.tipo == 'error') {
        this.toastr.error(res.message, "Error");
      } else {
        this.toastr.success(res.message, "Éxito");
      }
    })
  }

  getEmpleos() {
    this.biogService.getEmpleos(this.userLogin['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.empleos = res.result;
      } else {
        this.empleos = res;
      }
    })
  }

  clearFormEmpleo() {
    this.empleo = {
      empleo_empresa: "",
      empleo_puesto: "",
      empleo_detalle: "",
      empleo_fechainicio: "",
      empleo_fechafin: "",
      perfilusu_id: ""
    };
  }

  JqueryFunciones() {
    (function ($) {
      $(document).ready(function () {

        $('#formEmpleo').hide();

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

        //Mostrar formulario de emplo
        $('#btnAddEmpl').on('click', () => {
          $('#formEmpleo').show();
          $('#btnAddEmpl').hide();
        })

        //Ocultar formulario de emplo
        $('#cancelFormEmpleo').on('click', () => {
          $('#formEmpleo').hide();
          $('#btnAddEmpl').show();
        })

      });
    })(jQuery);
  }
}
