import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router'

declare var recFacial: any;

@Component({
  selector: 'app-rec-facil',
  templateUrl: './rec-facil.component.html',
  styleUrls: ['./rec-facil.component.css']
})
export class RecFacilComponent implements OnInit {

  constructor(
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    recFacial(this.router, this.ngZone);
  }

}
