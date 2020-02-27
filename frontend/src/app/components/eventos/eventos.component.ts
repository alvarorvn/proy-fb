import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { EventosService } from '../../services/eventos.service';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

declare var jQuery: any;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  // Objetos
  userLogin = {};

  eventos = {
    //evento_logo: "",
    //evento_portada: "",
    evento_tipo: "",
    evento_fecha_hora: "",
    evento_lugar: "",
    evento_nombre: ""
  }

  logoUpload;
  portadaUpload;

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private evenService: EventosService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
  }

  onFileChange(e) {
    this.logoUpload = e.target.files[0];
    //this.portadaUpload = e.target.files[1];
  }

  onFile1Change(e) {
    this.portadaUpload = e.target.files[0];
  }

  guardarEventos() {
    //console.log(this.logoUpload);
    const formData = new FormData();
    //archivo 
    formData.append('file', this.logoUpload);
    formData.append('file', this.portadaUpload);
    
    for (var u in this.eventos) {
      formData.append(u, this.eventos[u]);
    }
    
    this.evenService.addEvento(formData).subscribe(
      res => {

        if (res.tipo == 'error') {
          console.log(res.message);
        } else {
          //this.clearForm(); 
        }
      },
      err => {
        console.log(err);
      }
    )
    
    console.log(formData);
  }





}



