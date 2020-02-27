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
  telf = {
    telf_numero: "",
    perfilusu_id: ""
  }
  direccion = {
    dir_detalle: "",
    dir_codigopostal: "",
    perfilusu_id: "",
    ciud_id: ""
  }
  apodo = {
    apodo_nombre: "",
    perfilusu_id: ""
  }

  fileUpload;
  portadaUpload;

  // Lista de cosas
  ciudades: Array<Object> = [];
  s: Array<Object> = [];
  seguidos: Array<Object> = [];
  seguidores: Array<Object> = [];
  amigos: Array<Object> = [];
  empleos: Array<Object> = [];
  aptitudes: Array<Object> = [];
  estudios: Array<Object> = [];
  telefonos: Array<Object> = [];
  direcciones: Array<Object> = [];
  apodos: Array<Object> = [];

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
      this.getTelefonos();
      this.getCiudades();
      this.getApodos();
      this.getDirecciones();
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

  getCiudades() {
    this.biogService.getCiudades().subscribe(res => {
      if (res.tipo == 'error') {
        this.ciudades = res.result;
      } else {
        this.ciudades = res;
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
      this.ngOnInit();
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
            this.CerrarForm('#formEmpleo', '#btnAddEmpl');
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
          this.CerrarForm('#formEmpleo', '#btnAddEmpl');
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
    this.AbrirForm('#formEmpleo', '#btnAddEmpl');
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
    this.CerrarForm('#formEmpleo', '#btnAddEmpl');
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
            this.CerrarForm('#formAptitud', '#btnAddAptitud')
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
          this.CerrarForm('#formAptitud', '#btnAddAptitud')
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
    this.AbrirForm('#formAptitud', '#btnAddAptitud')
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
    this.CerrarForm('#formAptitud', '#btnAddAptitud')
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
            this.CerrarForm('#formEstudio', '#btnAddEstudio');
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
          this.CerrarForm('#formEstudio', '#btnAddEstudio');
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
    this.AbrirForm('#formEstudio', '#btnAddEstudio');
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
    this.CerrarForm('#formEstudio', '#btnAddEstudio');
  }

  // FIN ESTUDIOS

  // TELEFONO

  guardarTelefono() {
    if (this.telf['telf_id']) {
      this.biogService.updateTelf(this.userLogin['perfilusu_id'], this.telf).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getTelefonos();
            this.clearFormTelf();
            this.CerrarForm('#formTelefono', '#btnAddTelf');
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.telf.perfilusu_id = this.userLogin['perfilusu_id'];
      this.biogService.addTelf(this.telf).subscribe(res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getTelefonos();
          this.clearFormTelf();
          this.CerrarForm('#formTelefono', '#btnAddTelf');
        }
      })
    }
  }

  getTelefonos() {
    this.biogService.getTelf(this.userLogin['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.telefonos = res.result;
      } else {
        this.telefonos = res;
      }
    })
  }

  editTelefono(telf) {
    this.AbrirForm('#formTelefono', '#btnAddTelf');
    this.telf = telf;
  }

  deleteTelf(telf_id) {
    this.biogService.deleteTelf(this.userLogin['perfilusu_id'], telf_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getTelefonos();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  clearFormTelf() {
    this.telf = {
      telf_numero: "",
      perfilusu_id: ""
    };
    this.CerrarForm('#formTelefono', '#btnAddTelf')
  }

  // FIN TELEFONO

  // DIRECCION

  guardarDireccion() {
    if (this.direccion['dir_id']) {
      this.biogService.updateDireccion(this.userLogin['perfilusu_id'], this.direccion).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getDirecciones();
            this.clearFormDireccion();
            this.CerrarForm('#formDireccion', '#btnAddDireccion')
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.direccion.perfilusu_id = this.userLogin['perfilusu_id'];
      this.biogService.addDireccion(this.direccion).subscribe(res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getDirecciones();
          this.clearFormDireccion();
          this.CerrarForm('#formDireccion', '#btnAddDireccion')
        }
      })
    }
  }

  getDirecciones() {
    this.biogService.getDireccion(this.userLogin['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.direcciones = res.result;
      } else {
        this.direcciones = res;
      }
    })
  }

  editDireccion(direccion) {
    this.AbrirForm('#formDireccion', '#btnAddDireccion');
    this.direccion = direccion;
  }

  deleteDireccion(dir_id) {
    this.biogService.deleteDireccion(this.userLogin['perfilusu_id'], dir_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getDirecciones();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  clearFormDireccion() {
    this.direccion = {
      dir_detalle: "",
      dir_codigopostal: "",
      perfilusu_id: "",
      ciud_id: ""
    }
    this.CerrarForm('#formDireccion', '#btnAddDireccion')
  }

  // FIN DIRECCION

  // RELIGION

  guardarReligion() {
    this.biogService.updateReligion(this.userLogin['perfilusu_id'], { perfil_religion: this.userLogin['perfil_religion'] }).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getUserLogin(this.authService.getId());
          this.CerrarForm('#formReligion', '#btnAddReligion');
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  editReligion(religion) {
    this.AbrirForm('#formReligion', '#btnAddReligion');
    this.userLogin = religion;
  }

  clearFormReligion() {
    this.CerrarForm('#formReligion', '#btnAddReligion')
  }

  // FIN RELIGION

  // INTERES

  guardarInteres() {
    this.biogService.updateInteres(this.userLogin['perfilusu_id'], { perfil_interes: this.userLogin['perfil_interes'] }).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getUserLogin(this.authService.getId());
          this.CerrarForm('#formInteres', '#btnAddInteres');
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  editInteres(interes) {
    this.AbrirForm('#formInteres', '#btnAddInteres');
    this.userLogin = interes;
  }

  clearFormInteres() {
    this.CerrarForm('#formInteres', '#btnAddInteres')
  }

  // FIN INTERES

  // INFORMACION

  guardarInformacion() {
    this.biogService.updateInformacion(this.userLogin['perfilusu_id'], { perfil_informacion: this.userLogin['perfil_informacion'] }).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getUserLogin(this.authService.getId());
          this.CerrarForm('#formInformacion', '#btnAddInformacion')
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  editInformacion(info) {
    this.AbrirForm('#formInformacion', '#btnAddInformacion');
    this.userLogin = info;
  }

  clearFormInformacion() {
    this.CerrarForm('#formInformacion', '#btnAddInformacion')
  }

  // FIN INFORMACION

  // USERLOGIN

  guardarUserLogin() {
    let obj = {
      usuario_fechanac: this.userLogin['usuario_fechanac'],
      usuario_sexo: this.userLogin['usuario_sexo']
    }
    this.biogService.updateUserLogin(obj).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([`${this.authService.getId()}/biografia`]);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  editUserlogin(userLogin) {
    this.AbrirForm('#formInfoBasica', '#lala');
    this.userLogin = userLogin;
  }

  // FIN USERLOGIN

  // APODOS

  guardarApodo() {
    if (this.apodo['apodo_id']) {
      this.biogService.updateApodo(this.userLogin['perfilusu_id'], this.apodo).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getApodos();
            this.clearFormApodo();
            this.CerrarForm('#formApodos', '#btnAddApodos');
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.apodo.perfilusu_id = this.userLogin['perfilusu_id'];
      this.biogService.addApodo(this.apodo).subscribe(res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getApodos();
          this.clearFormApodo();
          this.CerrarForm('#formApodos', '#btnAddApodos');
        }
      })
    }
  }

  getApodos() {
    this.biogService.getApodo(this.userLogin['perfilusu_id']).subscribe(res => {
      if (res.tipo == 'error') {
        this.apodos = res.result;
      } else {
        this.apodos = res;
      }
    })
  }

  editApodo(apodo) {
    this.apodo = apodo;
    this.AbrirForm('#formApodos', '#btnAddApodos');
  }

  deleteApodo(apodo_id) {
    this.biogService.deleteApodo(this.userLogin['perfilusu_id'], apodo_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getApodos();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  clearFormApodo() {
    this.apodo = {
      apodo_nombre: "",
      perfilusu_id: ""
    };
    this.CerrarForm('#formApodos', '#btnAddApodos');
  }

  // FIN ESTUDIOS

  // FUNCIONES JQUERY

  JqueryFunciones() {
    (function ($) {
      $(document).ready(function () {

        $('#formEmpleo').hide();
        $('#formAptitud').hide();
        $('#formEstudio').hide();
        $('#formTelefono').hide();
        $('#formInfoBasica').hide();
        $('#formDireccion').hide();
        $('#formReligion').hide();
        $('#formInteres').hide();
        $('#formInformacion').hide();
        $('#formApodos').hide();


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

        $('#btn-act-info').on('click', () => {
          // NAV ITEMS
          $('#nvbio').removeClass('active');
          $('#nvamigos').removeClass('active');
          $('#nvfotos').removeClass('active');
          $('#nvinfo').addClass('active');

          // TABS
          $('#biografia').removeClass('active');
          $('#amigos').removeClass('active');
          $('#fotos').removeClass('active');
          $('#informacion').addClass('active');
        })

        $('#btn-editar-detalles').on('click', () => {
          // NAV ITEMS
          $('#nvbio').removeClass('active');
          $('#nvinfo').addClass('active');

          // TABS
          $('#biografia').removeClass('active');
          $('#informacion').addClass('active');
        })
      });
    })(jQuery);
  }

  CerrarForm(formulario, boton) {
    (function ($) {
      $(document).ready(function () {
        $(formulario).hide();
        $(boton).show();
      });
    })(jQuery);
  }

  AbrirForm(formulario, boton) {
    (function ($) {
      $(document).ready(function () {
        $(formulario).show();
        $(boton).hide();
      });
    })(jQuery);
  }
}
