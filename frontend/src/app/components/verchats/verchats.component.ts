import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
//import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-verchats',
  templateUrl: './verchats.component.html',
  styleUrls: ['./verchats.component.css']
})
export class VerchatsComponent implements OnInit {
  userLogin = {};
  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
  
  }

  ngOnInit(): void {
    if (this.authService.getId() && this.authService.getToken()) {
      this.getUserLogin(this.authService.getId());
    };
  }
  getUserLogin(id) {
    this.authService.getUserLogin({ usuario_id: id }).subscribe(res => {
      if (res.tipo != 'error') {
        this.userLogin = res;
      }
    })
  }
  getChatsUser(id){
    
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;charset=utf-8;base64, ${url}`);
  }

}
