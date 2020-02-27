import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { CreatePostService } from '../../services/create-post.service';
import { Post } from 'src/app/Post';
import { Router } from '@angular/router';

import { PostsComponent } from '../../components/posts/posts.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {//PADRE

  //@ViewChild(PostsComponent, {static: false}) postsComponent: PostsComponent;

  private pub_texto: string;
  test: string = 'Prueba de delete'; //<---
  userLogin = {};
  posts: Post[];
  userId = this.authService.getId();
  fileUpload;

  constructor(private authService: AuthService, private createPostService: CreatePostService, private router: Router) {
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

  receiveMessage($event){
    this.test = $event;
  }

  // Add post
  toPost() {
    console.log(this.pub_texto, this.userId);
    this.createPostService.savepost({ "pub_texto": this.pub_texto, "usuario_id": this.userId }).subscribe(res => {
      this.posts.push(res);
      console.log(res);
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

  // Subida de archivos
  /*onFileChange(e) {
    this.fileUpload = e.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.fileUpload);
    this.createPostService.updatePerfilPhoto(formData).subscribe(res => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //this.router.onSameUrlNavigation = 'reload';
      //this.router.navigate([`${this.authService.getId()}/biografia`]);
    })
  }*/

  hijole() {
    console.log("Dentro de hijole");
    this.createPostService.deletePost(51);
    //this.postsComponent.deletePost();
  }

  updatePost(){
    let p = {"pub_id": 56, "pub_texto": "Actualizado!", "usuario_id": 2};
    this.createPostService.updatePost(p);
  }

}//end class
