import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

declare var recFacial: any;

@Component({
  selector: 'app-rec-facil',
  templateUrl: './rec-facil.component.html',
  styleUrls: ['./rec-facil.component.css']
})
export class RecFacilComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    recFacial(this.router);
  }  

}
