import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../services/page.service';
import {AlertService} from '../../../services/alert.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-pages',
  templateUrl: './edit-pages.component.html',
  styleUrls: ['./edit-pages.component.css']
})
export class EditPagesComponent implements OnInit {
  public portada: File;
  public logo: File;
  public pageId: any;
  public page: any;
  public categorias: any;
  public url: string;
  public isAdmin: boolean;
  constructor(private router: ActivatedRoute, private pageService: PageService,
              private alertService: AlertService) {
    this.page = {};
    this.categorias = this.pageService.categorias;
    this.url = pageService.url;
    this.isAdmin = false;
  }

  ngOnInit() {
    this.pageId = this.router.snapshot.paramMap.get('id');
    this.getPage();
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

  getPage() {
    this.pageService.show(this.pageId).subscribe(res => {
      if (res.ok) {
        this.isAdmin = res.isAdmin;
        this.page = res.data;
      }
    }, err => {
      if (err.error) {
        this.alertService.error(err.error.message);
      }
    });
  }

  updatePage(formAddPage: NgForm) {
    if (!this.page.pagina_nombre || !this.page.pagina_telefono) {
      this.alertService.error('NOMBRE, TELÉFONO Y CATEGORÍA son requeridos');
      return;
    }
    if (!this.page.categoria && !this.page.pagina_categoria) {
      this.alertService.error('Seleccione una CATEGORÍA');
      return;
    }

    const formData = new FormData();
    if (this.logo) {
      formData.append('logo', this.logo);
    }
    if (this.portada) {
      formData.append('portada', this.portada);
    }
    if (this.page.categoria) {
      formData.append('categoria', this.page.categoria);
    } else {
      formData.append('categoria', this.page.pagina_categoria);
    }

    formData.append('nombre', this.page.pagina_nombre);
    formData.append('telefono', this.page.pagina_telefono);

    this.pageService.update(this.pageId, formData).subscribe(res => {
        if (res.ok) {
          this.alertService.success(res.message);
        }
    }, err => {
      if (err.error) {
        this.alertService.error(err.error.message);
      }
    });
  }

}
