import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() pub_texto;
  @Input() pub_id;

  @Input() create_post: CreatePostComponent;
  @HostListener('click')
  click(){
    this.deletePost(2);
  }
  
  constructor() { }

  ngOnInit() {
  }

  deletePost(pub_id){
    this.create_post.deletePost({pub_id: 2});
  }

}// end class
