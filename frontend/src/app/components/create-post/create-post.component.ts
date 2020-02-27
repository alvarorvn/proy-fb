import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { CreatePostService } from '../../services/create-post.service';
import { Post } from 'src/app/Post';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {//PADRE

  //@ViewChild(PostsComponent, {static: false}) postsComponent: PostsComponent;

  private pub_texto: string;
  test: string = 'Prueba de delete'; //<---
  userLogin = {usuario_apellidos:""};
  posts: Post[];
  saludo: string;
  userId = this.authService.getId();
  fileUpload;
  formData;
  changeImg: boolean = false;
  

  constructor(private authService: AuthService, private createPostService: CreatePostService, private router: Router,private sanitizer: DomSanitizer) {
    this.getUserLogin();
    //this.formData = new FormData;
    
    this.saludo = `¿Qué estás pensando ${this.userLogin.usuario_apellidos}?`;
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
    //this.formData = new FormData;
  }

  receiveMessage($event){
    this.test = $event;
  }

  renderImage(formDataImg) {
    const file = formDataImg.get('file');
    const image = URL.createObjectURL(file);
    const tagImg = document.getElementById('image');
    tagImg.setAttribute('src', image);
    tagImg.style.display='block';
    //this.formData = null;
  }

  // Add post
  toPost() {
    
    console.log(this.pub_texto, this.userId);
    const formData = new FormData;
    if(this.changeImg != false){
      formData.append('file', this.fileUpload); //<-
    formData.append('pub_texto', this.pub_texto);
    formData.append('usuario_id', this.userId);
    }else{
      
    formData.append('pub_texto', this.pub_texto);
    formData.append('usuario_id', this.userId);
    }
    
    
    this.createPostService.savepost(formData).subscribe(res => {
      
      this.posts.push(res);
      this.closeModal();
      this.pub_texto = '';
      const tagImg = document.getElementById('image');
      tagImg.style.display='none';
      tagImg.removeAttribute('src');
      //this.formData.set('file', null);
      
    });
  }

  // Subida de archivos
  onFileChange(e) {
    const formDataImg = new FormData;
    this.fileUpload = e.target.files[0];
    this.changeImg = true;
    formDataImg.append('file', this.fileUpload);
    this.renderImage(formDataImg);
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

  getUserLogin() {
    this.authService.getUserLogin({ usuario_id: this.userId }).subscribe(res => {
      if (res.tipo != 'error') {
        this.userLogin = res;
        console.log(this.userLogin);
      }
    })
  }

  showModal() {
    var modali = document.getElementById('modal');
    const tagImg = document.getElementById('image');
    tagImg.style.display='none';
    this.changeImg = false;
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


  updatePost(){
    let p = {"pub_id": 56, "pub_texto": "Actualizado!", "usuario_id": 2};
    this.createPostService.updatePost(p);
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;charset=utf-8;base64, ${url}`);
  }

  generateFormData(){
    return new FormData;
  }

}//end class
