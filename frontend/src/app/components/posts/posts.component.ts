import { Component, OnInit, Input } from '@angular/core';
import { CreatePostService } from '../../services/create-post.service';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {//hijo
  @Input() pub_texto;
  @Input() pub_pathMult;
  @Input() pub_id;
  @Input() usuario_id;

  userLogin = {};
  //userId = this.authService.getId();
  userId = window.location.pathname.split('/')[1];
  //@Output() messageEvent = new EventEmitter<string>();

  //test2: string = 'Desde hijo test';
  
  constructor(private createPostService: CreatePostService, private router: Router, private authService: AuthService, private sanitizer: DomSanitizer) {
    this.getUserLogin();
  }

  ngOnInit() {
  }

  getUserLogin() {
    this.authService.getUserLogin({ usuario_id: this.userId }).subscribe(res => {
      if (res.tipo != 'error') {
        this.userLogin = res;
        console.log(this.userLogin);
      }
    })
  }

  deletePost(){
    console.log("Texto: " + this.pub_texto);
    console.log("ID  de pub: " + this.pub_id);
    console.log("User id: " + this.usuario_id);
    this.createPostService.deletePost(this.pub_id).subscribe(data => {
      console.log("Eliminado");
      document.getElementById(this.pub_id).style.display='none';
    });

    //this.messageEvent.emit(this.test2);
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;charset=utf-8;base64, ${url}`);
  }

}// end class
