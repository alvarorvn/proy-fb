import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { BiografiaService } from '../../services/biografia.service';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-verconectados',
  templateUrl: './verconectados.component.html',
  styleUrls: ['./verconectados.component.css']
})
export class VerconectadosComponent implements OnInit {
  amigos: Array<Object> = [];

  userLogin = {};
  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private biogService: BiografiaService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.authService.getId() && this.authService.getToken()) {
      this.getUserLogin(this.authService.getId());
    };
    let iniciar = setInterval(() => {
      if (!this.authService.getId() && !this.authService.getToken()) {
        this.pararBucle(iniciar)
      } else {
        this.getAmigos();
      }
    }, 1000);
  }

  pararBucle(nombre) {
    clearInterval(nombre)
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


  getAmigos() {
    this.biogService.getAmigos().subscribe(res => {
      if (res.tipo == 'error') {
        this.amigos = res.result;
      } else {
        this.amigos = res;
      }
    })
  }

}
