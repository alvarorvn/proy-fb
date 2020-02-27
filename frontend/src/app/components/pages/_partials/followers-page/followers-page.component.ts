import {Component, Input, OnInit} from '@angular/core';
import {PageService} from '../../../../services/page.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-followers-page',
  templateUrl: './followers-page.component.html',
  styleUrls: ['./followers-page.component.css']
})
export class FollowersPageComponent implements OnInit {
  public followers;
  public page;
  public showMore;
  @Input() pageId;
  constructor(public pageService: PageService) {
    this.followers = [];
    this.page = 0;
    this.showMore = true;
  }

  ngOnInit() {
    this.getFollowers(false);
  }

  public reloadFollowers() {
    this.page = 0;
    this.followers = [];
    this.showMore = true;
    this.getFollowers(false);
  }

  public getFollowers(clicked) {
    this.page++;
    const limit = 20;

    this.pageService.getFollowers(this.pageId, limit, this.page).subscribe(res => {
      console.log(this.pageId, res);
      if (res.ok) {
        // this.publications = res.data;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < res.data.length; i++) {
          this.followers.push(res.data[i]);
          // console.log(res.data[i])
        }

        if (res.data.length < limit) {
          this.showMore = false;
        }
        if (clicked) {
          $('body, html').animate({ scrollTop: $('body').prop('scrollHeight')}, 500);
        }
      }
    }, err => console.log(err));
  }
}
