import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { BiografiaService } from '../../services/biografia.service';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-biografia',
  templateUrl: './biografia.component.html',
  styleUrls: ['./biografia.component.css']
})
export class BiografiaComponent implements OnInit {

  fileUpload;
  portadaUpload;
  userLogin = {};
  seguidores: Array<Object> = []

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private biogService: BiografiaService,
    private router: Router
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
