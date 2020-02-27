import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Post';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {

  URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  deletePost(pub_id) {
    console.log("Dentro de angular delete: " + pub_id);
    return this.http.delete<Post>('http://localhost:3000/deletepost/' + pub_id);
  }

  savepost(post) {
    return this.http.post<Post>(`${this.URL}/savepost`, post);
  }

  getPostsUser(id) {
    return this.http.get<Post[]>(`${this.URL}/getpostsuser/${id}`);
  }

  updatePost(newPost){
    console.log("Dentro de angular update");
    return this.http.put<any>(`${this.URL}/updatepost/${newPost.pub_id}`, newPost);
  }

  

  /*deleteTask(id) {
    return this.http.delete<Task>(`${this.domain}/tasks/del/${id}`).pipe(map(res => res));
  }*/

  /*updatePerfilPhoto(photo) {//Subida de archivos a create post
    return true;//this.http.post<any>(`${this.URL}/${this.authService.getId()}/update-perfil-photo`, photo);
  }*/

}//end class
