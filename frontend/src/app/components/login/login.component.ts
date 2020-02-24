import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

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
    usuario_email: "",
    usuario_password: ""
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.userl).subscribe(res => {
      if (res.tipo === 'error') {
        this.toastr.error(res.message, "Error");
      } else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.user.usuario_id)
        this.router.navigate([`${res.user.usuario_id}`])
      }
    });
  }

  registrar() {
    const formData = new FormData();
    formData.append('file', this.fileUpload);
    for (var u in this.user) {
      formData.append(u, this.user[u]);
    }
    this.authService.signUp(formData).subscribe(
      res => {

        if (res.tipo == 'error') {
          console.log(res.message);
        } else {
          this.clearForm();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  clearForm() {
    this.user.usuario_nombres = null;
    this.user.usuario_apellidos = null;
    this.user.usuario_email = null;
    this.user.usuario_password = null;
    this.user.usuario_fechanac = null;
    this.user.usuario_sexo = null;
    this.user.usuario_path_face = null;
    this.fileUpload = null
  }

  onFileChange(e) {
    this.fileUpload = e.target.files[0];
  }
}
