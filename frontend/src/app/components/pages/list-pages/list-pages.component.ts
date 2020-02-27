import { Component, OnInit } from '@angular/core';
import {PageService} from "../../../services/page.service";
import {AlertService} from "../../../services/alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-pages',
  templateUrl: './list-pages.component.html',
  styleUrls: ['./list-pages.component.css']
})
export class ListPagesComponent implements OnInit {

  public pages: any;
  public url: string;
  public userId;
  constructor(public pageService: PageService,
              public router: ActivatedRoute,
              public alertService: AlertService) {
    this.userId = router.snapshot.paramMap.get('iduser');
  }

  ngOnInit() {
    this.url = this.pageService.url;
    this.getPages();
  }

  getPages() {
    this.pages = {};
    this.pageService.list().subscribe(res => {
      if (res.ok) {
        this.pages = res.data;
      }
    }, err => {
      console.log(err);
    });
  }

  removePage(pageId) {
    if (!window.confirm('¿Esta seguro de que desea eliminar esta página?')) { return; }

    this.pageService.destroy(pageId).subscribe(res => {
        if(res.ok) {
          this.alertService.success(res.message);
          this.getPages();
        }
    }, err => {
        if (err.error) {
          this.alertService.error(err.error.message);
        }
    });
  };

}
