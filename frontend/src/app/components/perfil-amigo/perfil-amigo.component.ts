import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from "../../services/auth.service";
import { PerfilAmigoService } from "../../services/perfil-amigo.service";

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private perfAmigo: PerfilAmigoService
  ) {
    this.amigo_id = this.route.snapshot.params.idamigo;
  }

  ngOnInit() {
    this.getPerfilAmigo();
    this.getAmigos();
    this.getSeguidores();
    this.getSeguidos();
    setTimeout(() => {
      this.getEmpleos();
      this.getAptitudes();
      this.getEstudios();
      this.getTelefonos();
      this.getApodos();
      this.getDirecciones();
      console.log(this.esAmigo());
    }, 1000);
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
}
