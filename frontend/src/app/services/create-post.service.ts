import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Post';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {

  URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  savepost(post) {
    return this.http.post<any>(`${this.URL}/savepost`, post);
  }

  getPostsUser(id) {
    return this.http.get<Post[]>(`${this.URL}/getpostsuser/${id}`);
  }

  deletePost(id) {
    return this.http.delete<any>(`${this.URL}/delete/${id}`);
  }

}//end class
