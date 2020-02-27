import {Component, Input, OnInit} from '@angular/core';
import {PageService} from '../../../../services/page.service';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css']
})
export class VideoPageComponent implements OnInit {

  @Input() pageId !: any;
  public  videos: any;
  public url: string;
  constructor(public pageService: PageService) {
    this.videos = [];
    this.url = pageService.url;
  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    this.pageService.getPublishMedia(this.pageId, true).subscribe(res => {
      console.log('videos', res.data);
      if (res.ok) {
        this.videos = res.data;
      }
    }, err => console.log(err));
  }

}
