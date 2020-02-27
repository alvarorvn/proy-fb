import {Component, Input, OnInit} from '@angular/core';
import {PageService} from '../../../../services/page.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-publications-page',
  templateUrl: './publications-page.component.html',
  styleUrls: ['./publications-page.component.css']
})
export class PublicationsPageComponent implements OnInit {
  @Input() pageId !: any;
  @Input() page !: any;
  @Input() admin !: boolean;

  publications: any;
  url: string;
  public pageNumber;
  public showMore;
  constructor(public pageService: PageService) {
    this.publications = [];
    this.url = pageService.url;
    this.pageNumber = 0;
    this.showMore = true;
  }

  ngOnInit() {
    this.getPublications(false);
  }

  resetPublications() {
    this.pageNumber = 0;
    this.publications = [];
    this.getPublications(false);
  }

  getPublications(clicked) {
    this.pageNumber++;
    this.pageService.getPublish(this.pageId, this.pageNumber, 15).subscribe(res => {
        if (res.ok) {
          // this.publications = res.data;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < res.data.length; i++) {
            this.publications.push(res.data[i]);
            // console.log(res.data[i])
          }

          if (res.data.length < 15) {
            this.showMore = false;
          }
          if (clicked) {
            $('body, html').animate({ scrollTop: $('body').prop('scrollHeight')}, 500);
          }
        }
    }, err => {
      console.log(err);
    });
  }

  isVideo(fileName) {
    if (!fileName) {return false;}

    const name = fileName.split('.');
    if (name.length === 2) {
      if (name[1] === 'mp4') {
        return true;
      }
    }
    return false;
  }

  isDefined(img) {
    return img !== undefined;
  }

}
