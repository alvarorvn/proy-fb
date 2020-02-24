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
  aptitud = {
    habprof_aptitud: "",
    perfilusu_id: ""
  };
  estudio = {
    univ_centroeduc: "",
    univ_fechainicio: "",
    univ_fechafin: "",
    univ_detalle: "",
    univ_especialidad: "",
    univ_finalizada: true,
    perfilusu_id: ""
  };

  fileUpload;
  portadaUpload;

  // Lista de cosas
  seguidores: Array<Object> = [];
  seguidos: Array<Object> = [];
  amigos: Array<Object> = [];
  empleos: Array<Object> = [];
  aptitudes: Array<Object> = [];
  estudios: Array<Object> = [];

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
      this.getEmpleos();
      this.getAptitudes();
      this.getEstudios();
    }, 1000);
    setTimeout(() => {
      this.JqueryFunciones();
    }, 1500);
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

  // EMPLEOS
  guardarEmpleo() {
    if (this.empleo['empleo_id']) {
      this.biogService.updateEmpleos(this.userLogin['perfilusu_id'], this.empleo).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getEmpleos();
            this.clearFormEmpleo();
            this.CerrarFormEmpleo();
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.empleo.perfilusu_id = this.userLogin['perfilusu_id'];
      this.biogService.addEmpleo(this.empleo).subscribe(res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getEmpleos();
          this.clearFormEmpleo();
          this.CerrarFormEmpleo();
        }
      })
    }
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

  editEmpleo(emp) {
    this.empleo = emp;
  }

  deleteEmpleo(empleo_id) {
    this.biogService.deleteEmpleos(this.userLogin['perfilusu_id'], empleo_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getEmpleos();
        }
      },
      err => {
        console.log(err);
      }
    )
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

  // FIN EMPLEO

  // APTITUDES

  guardarAptitud() {
    if (this.aptitud['habprof_id']) {
      this.biogService.updateAptitud(this.userLogin['perfilusu_id'], this.aptitud).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAptitudes();
            this.clearFormAptitud();
            this.CerrarFormAptitud();
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.aptitud.perfilusu_id = this.userLogin['perfilusu_id'];
      this.biogService.addAptitud(this.aptitud).subscribe(res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getAptitudes();
          this.clearFormAptitud();
          this.CerrarFormAptitud();
        }
      })
    }
  }

  getAptitudes() {
    this.biogService.getAptitud(this.userLogin['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.aptitudes = res.result;
      } else {
        this.aptitudes = res;
      }
    })
  }

  editAptitud(apt) {
    this.aptitud = apt;
  }

  deleteAptitud(aptitud_id) {
    this.biogService.deleteAptitud(this.userLogin['perfilusu_id'], aptitud_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getAptitudes();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  clearFormAptitud() {
    this.aptitud = {
      habprof_aptitud: "",
      perfilusu_id: ""
    };
  }

  // FIN APTITUDES

  // ESTUDIOS

  guardarEstudio() {
    if (this.estudio['univ_id']) {
      this.biogService.updateEstudio(this.userLogin['perfilusu_id'], this.estudio).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getEstudios();
            this.clearFormEstudio();
            this.CerrarFormEstudio();
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.estudio.perfilusu_id = this.userLogin['perfilusu_id'];
      this.biogService.addEstudio(this.estudio).subscribe(res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getEstudios();
          this.clearFormEstudio();
          this.CerrarFormEstudio();
        }
      })
    }
  }

  getEstudios() {
    this.biogService.getEstudio(this.userLogin['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.estudios = res.result;
      } else {
        this.estudios = res;
      }
    })
  }

  editEstudio(est) {
    this.estudio = est;
  }

  deleteEstudio(univ_id) {
    this.biogService.deleteEstudio(this.userLogin['perfilusu_id'], univ_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getEstudios();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  clearFormEstudio() {
    this.estudio = {
      univ_centroeduc: "",
      univ_fechainicio: "",
      univ_fechafin: "",
      univ_detalle: "",
      univ_especialidad: "",
      univ_finalizada: true,
      perfilusu_id: ""
    };
  }

  // FIN ESTUDIOS

  JqueryFunciones() {
    (function ($) {
      $(document).ready(function () {

        $('#formEmpleo').hide();
        $('#formAptitud').hide();
        $('#formEstudio').hide();

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

        //Mostrar formulario de empleo
        $('#btnAddEmpl').on('click', () => {
          $('#formEmpleo').show();
          $('#btnAddEmpl').hide();
        })
        $('#btnAddAptitud').on('click', () => {
          $('#formAptitud').show();
          $('#btnAddAptitud').hide();
        })
        $('#btnAddEstudio').on('click', () => {
          $('#formEstudio').show();
          $('#btnAddEstudio').hide();
        })

        $('#editAptitudButton').on('click', () => {
          $('#formAptitud').show();
        })
        $('#editEmpleoB').on('click', () => {
          $('#formEmpleo').show();
        })
        $('#editEstudioButton').on('click', () => {
          $('#formEstudio').show();
        })

        //Ocultar formulario de emplo
        $('#cancelFormEmpleo').on('click', () => {
          $('#formEmpleo').hide();
          $('#btnAddEmpl').show();
        })
        $('#cancelFormAptitud').on('click', () => {
          $('#formAptitud').hide();
          $('#btnAddAptitud').show();
        })
        $('#cancelFormEstudio').on('click', () => {
          $('#formEstudio').hide();
          $('#btnAddEstudio').show();
        })

      });
    })(jQuery);
  }

  CerrarFormEmpleo() {
    (function ($) {
      $(document).ready(function () {
        $('#formEmpleo').hide();
        $('#btnAddEmpl').show();
      });
    })(jQuery);
  }

  CerrarFormAptitud() {
    (function ($) {
      $(document).ready(function () {
        $('#formAptitud').hide();
        $('#btnAddAptitud').show();
      });
    })(jQuery);
  }

  CerrarFormEstudio() {
    (function ($) {
      $(document).ready(function () {
        $('#formEstudio').hide();
        $('#btnAddEstudio').show();
      });
    })(jQuery);
  }
}
