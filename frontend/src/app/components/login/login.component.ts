import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fileUpload;
  image;

  user = {
    usuario_nombres: "",
    usuario_apellidos: "",
    usuario_email: "",
    usuario_password: "",
    usuario_fechanac: "",
    usuario_sexo: "",
    usuario_path_face: ""
  };

  userl = {
    usuariol_email: "",
    usuariol_password: ""
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  registrar() {
    const formData = new FormData();
    formData.append('file', this.fileUpload);
    for (var u in this.user) {
      formData.append(u, this.user[u]);
    }
    this.authService.signUp(formData).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  /*getUsers() {
    this.authService.getUsers().subscribe(
      res => { 
        this.user = res;
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.base64str}`);
      }
      ,
      err => { }
    )
  }*/

  onFileChange(e) {
    this.fileUpload = e.target.files[0];
  }
}
