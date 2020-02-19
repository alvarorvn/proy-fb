import { Component, OnInit } from '@angular/core';

declare var recFacial: any;

@Component({
  selector: 'app-rec-facil',
  templateUrl: './rec-facil.component.html',
  styleUrls: ['./rec-facil.component.css']
})
export class RecFacilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    recFacial();
  }  

}
