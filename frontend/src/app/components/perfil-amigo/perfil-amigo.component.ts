import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-amigo',
  templateUrl: './perfil-amigo.component.html',
  styleUrls: ['./perfil-amigo.component.css']
})
export class PerfilAmigoComponent implements OnInit {

  amigo_id = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.amigo_id = this.route.snapshot.params.idamigo;
  }

  ngOnInit() {
    console.log(this.amigo_id);
  }

}
