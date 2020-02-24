import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { CreatePostService } from '../../services/create-post.service';
import { Post } from 'src/app/Post';

var helpers = require('../../../assets/helpers.js');

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  private pub_texto: string;

  userLogin = {};
  posts: Post[];
  userId = this.authService.getId();

  constructor(private authService: AuthService, private createPostService: CreatePostService) {
    createPostService.getPostsUser(this.userId).subscribe(res => {
      if (res['message']) {
        this.posts = res['result'];
      } else {
        this.posts = res;
      }
    });
  }

  ngOnInit() {
    /*setTimeout(() => {
      console.log(this.posts['result']);
    }, 1000);*/
  }

  // Add post
  toPost() {
    console.log(this.pub_texto, this.userId);
    this.createPostService.savepost({ "pub_texto": this.pub_texto, "usuario_id": this.userId }).subscribe(res => {
      this.posts.push(res);
      this.closeModal();
      this.pub_texto = '';
    });
  }

  // Delete post
  deletePost(pub_id) {
    console.log(pub_id);
    const response = confirm('¿Seguro que desea eliminar la publicación?');
    if (response) {
      this.createPostService.deletePost(pub_id)
        .subscribe(data => {
          console.log(data.n);
          if (data.n == 1) {
            for (let i = 0; i < this.posts.length; i++) {
              if (this.posts[i].pub_id == pub_id) {
                this.posts.splice(i, 1);
              }
            }
          }
        })
    }
  }

  getUserLogin(id) {
    this.authService.getUserLogin({ usuario_id: id }).subscribe(res => {
      if (res.tipo != 'error') {
        this.userLogin = res;
        console.log(this.userLogin);
      }
    })
  }

  showModal() {
    var modali = document.getElementById('modal');
    modali.style.display = 'block';
    modali.addEventListener('click', e => {
      if (e.target === modali) {
        modali.style.display = 'none';
      }
    });
  }

  closeModal() {
    var modali = document.getElementById('modal');
    modali.style.display = 'none';
  }



}//end class
