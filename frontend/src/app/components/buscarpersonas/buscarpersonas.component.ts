import { Component, OnInit } from '@angular/core';
import { BuscarpersonasService } from '../../services/buscarpersonas.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-buscarpersonas',
  templateUrl: './buscarpersonas.component.html',
  styleUrls: ['./buscarpersonas.component.css']
})
export class BuscarpersonasComponent implements OnInit {
  personas: any;
  
  constructor(
    
    private buscarpersona: BuscarpersonasService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }
  
  getPersonas(user_busq) {
    this.buscarpersona.getPersonas(user_busq).subscribe(res => {
      if (res.tipo == 'error') {
        this.personas = res.result;
      } else {
        this.personas = res;
      }
    })
  }

}
