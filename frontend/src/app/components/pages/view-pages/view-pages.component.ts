import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../services/page.service';
import {FollowersPageComponent} from "../_partials/followers-page/followers-page.component";

@Component({
  selector: 'app-view-pages',
  templateUrl: './view-pages.component.html',
  styleUrls: ['./view-pages.component.css']
})
export class ViewPagesComponent implements OnInit {
  @ViewChild(FollowersPageComponent, {static: false}) childFollowers: FollowersPageComponent;
  public pageId: any;
  public url;
  public page;
  public isAdmin: boolean;
  public isEditor: boolean;
  public isFollowed: boolean;
  public followNum: number;
  public followers: any;
  public userId;

  constructor(private router: ActivatedRoute, private pageService: PageService) {
    this.userId = router.snapshot.paramMap.get('iduser');
    this.pageId = this.router.snapshot.paramMap.get('id');
    this.url = pageService.url;
    this.followers = {};
    this.page = {};
  }

  ngOnInit() {
    this.getPage();
    this.getFollowers();
  }

  getPage() {
    this.pageService.pageById(this.pageId).subscribe(res => {
      if (res.ok) {
        this.page = res.data;
        this.isAdmin = res.isAdmin;
        this.isEditor = res.isEditor;
        this.isFollowed = res.isFollowed;
        this.followNum = res.followNum;
      }
      console.log(res.data);
    }, err => {
      console.log(err);
    });
  }

  getFollowers() {
    this.pageService.getFollowers(this.pageId).subscribe(res => {
      if (res.ok) {
        this.followers = res.data;
      }
    }, err => {
        console.log(err);
    });
  }

  followUnfollow() {
    this.pageService.follow(this.pageId).subscribe(res => {
      if (res.ok) {
        this.isFollowed = !this.isFollowed;
        if (this.isFollowed) {
          this.followNum++;
        } else {
          this.followNum--;
        }
        this.getFollowers();
        this.childFollowers.reloadFollowers();
      }
    }, err => {
      console.log(err);
    });
  }

  canPublish() {
    if (this.isAdmin) { return true; }
    if (this.isEditor ) {return true;}
    return false;
  }
}
