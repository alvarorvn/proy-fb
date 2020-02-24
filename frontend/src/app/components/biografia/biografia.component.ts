import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { BiografiaService } from '../../services/biografia.service';

declare var jQuery: any;

@Component({
  selector: 'app-biografia',
  templateUrl: './biografia.component.html',
  styleUrls: ['./biografia.component.css']
})
export class BiografiaComponent implements OnInit {

  userLogin = {};
  seguidores: Array<Object> = []

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private biogService: BiografiaService
  ) {
  }

  ngOnInit() {
    if (this.authService.getId() && this.authService.getToken()) {
      this.getUserLogin(this.authService.getId());
    };
    this.getSeguidores();
    setTimeout(() => {
      this.JqueryFunciones();
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

  JqueryFunciones() {
    (function ($) {
      $(document).ready(function () {
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
