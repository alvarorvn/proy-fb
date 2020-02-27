import { Component, OnInit, Input } from '@angular/core';
import { CreatePostService } from '../../services/create-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {//hijo
  @Input() pub_texto;
  @Input() pub_id;
  @Input() usuario_id;

  //@Output() messageEvent = new EventEmitter<string>();

  //test2: string = 'Desde hijo test';
  
  constructor(private createPostService: CreatePostService, private router: Router) {}

  ngOnInit() {
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

}// end class
