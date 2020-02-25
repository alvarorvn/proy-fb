import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-amigo',
  templateUrl: './perfil-amigo.component.html',
  styleUrls: ['./perfil-amigo.component.css']
})
export class PerfilAmigoComponent implements OnInit {

  amigo_id = "";
  perfil_amigo = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,    
    private sanitizer: DomSanitizer
  ) {
    this.amigo_id = this.route.snapshot.params.idamigo;
  }

  ngOnInit() {    
    this.getPerfilAmigo();
    setTimeout(() => {
    }, 800);
  }

  getPerfilAmigo() {
    this.authService.getUserLogin({ usuario_id: this.amigo_id }).subscribe(res => {
      this.perfil_amigo = res;
    })
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;charset=utf-8;base64, ${url}`);
  }
}
