import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    usuario_nombres: "",
    usuario_apellidos: "",
    usuario_email: "",
    usuario_password: "",
    usuario_fechanac: "",
    usuario_sexo: "",
    usuario_path_face: ""
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.authService.signUp(this.user).subscribe(
      res => {
        //console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  login() {
    this.authService.login(this.user).subscribe(
      res => {
        this.router.navigate(['/'])
      },
      err => {
        console.log(err);
      }
    )
  }
}
