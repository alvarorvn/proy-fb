import { Component, OnInit } from '@angular/core';
import { BuscarpersonasService } from '../../services/buscarpersonas.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscarpersonas',
  templateUrl: './buscarpersonas.component.html',
  styleUrls: ['./buscarpersonas.component.css']
})
export class BuscarpersonasComponent implements OnInit {

  userLogin = {};

  fileUpload;
  portadaUpload;
  constructor(
    private buscarpersona: BuscarpersonasService,
    private navbar: NavbarComponent,
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService,
  ) { }
  personas: Array<Object> = [];
  ngOnInit() {
    if (this.authService.getId() && this.authService.getToken()) {
      this.getUserLogin(this.authService.getId());
    };
    this.getPersonas()
  }

  getPersonas() {
    this.buscarpersona.getPersonas(localStorage.getItem('usr_busq')).subscribe(res => {
      if (res.tipo == 'error') {
        this.personas = res.result;
      } else {
        this.personas = res;
      }
    })
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


}
