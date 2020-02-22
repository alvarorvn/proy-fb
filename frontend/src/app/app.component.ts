import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})

export class AppComponent /*implements OnInit*/ {

  //userLogin = {};

  constructor(
    private authService: AuthService
  ) { }

  /*ngOnInit() {
    if (this.authService.getId() && this.authService.getToken()) {
      this.getUserLogin(this.authService.getId());
      console.log(this.userLogin);
    };
  }

  getUserLogin(id) {
    this.authService.getUserLogin({ usuario_id: id }).subscribe(res => {
      if (res.tipo != 'error') {
        this.userLogin = res;
      }
    })
  }*/
}

