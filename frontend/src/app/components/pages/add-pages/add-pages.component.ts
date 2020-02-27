import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service';
import {NgForm} from '@angular/forms';
import {AlertService} from '../../../services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-pages',
  templateUrl: './add-pages.component.html',
  styleUrls: ['./add-pages.component.css']
})
export class AddPagesComponent implements OnInit {
  public userId;
  constructor(private pageService: PageService,
              private alertService: AlertService,
              public router: Router, route: ActivatedRoute) {
    this.userId = route.snapshot.paramMap.get('iduser');
  }

  public categorias = this.pageService.categorias;
  public page: any;
  public logo: File;
  public portada: File;
  ngOnInit() {
    this.page = {};
  }

  onSelectPortada(event) {
    if (event.target.files.length === 0) {
      return;
    }
    this.portada = event.target.files[0];
  }

  onSelectLogo(event) {
    if (event.target.files.length === 0) {
      return;
    }
    this.logo = event.target.files[0];
  }

  addPublication(formAddPage: NgForm) {
    if (!this.page.nombre || !this.page.categoria || !this.page.telefono) {
      this.alertService.error('NOMBRE, TELÉFONO Y CATEGORÍA son requeridos');
      return;
    }

    if (!this.logo || !this.portada) {
      this.alertService.error('Escoja un LOGO y PORTADA');
      return;
    }

    const formData = new FormData();
    formData.append('logo', this.logo);
    formData.append('portada', this.portada);
    formData.append('nombre', this.page.nombre);
    formData.append('categoria', this.page.categoria);
    formData.append('telefono', this.page.telefono);

    this.pageService.store(formData).subscribe(res => {
      console.log(res);
      if (res.ok) {
        this.alertService.success('Pagina Creada con éxito');
        formAddPage.reset();
        this.logo = null;
        this.portada = null;
        this.router.navigate([`/${this.userId}/pages`]);
      }
    }, err => {
        if (err.error) {
          this.alertService.error(err.error.message);
        }
    });


  }
}
