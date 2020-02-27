import {Component, Input, OnInit} from '@angular/core';
import {PageService} from "../../../../services/page.service";

@Component({
  selector: 'app-images-page',
  templateUrl: './images-page.component.html',
  styleUrls: ['./images-page.component.css']
})
export class ImagesPageComponent implements OnInit {

  public url: string;
  public images: any;
  @Input() pageId;
  constructor(public pageService: PageService) {
    this.url = pageService.url;
    this.images = {};
  }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.pageService.getPublishMedia(this.pageId).subscribe(res => {
      if (res.ok) {
        this.images = res.data;
      }
    }, err => console.log(err));
  }

}
