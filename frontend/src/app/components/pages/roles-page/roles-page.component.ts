import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PageService} from "../../../services/page.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.css']
})
export class RolesPageComponent implements OnInit {
  public search: string;
  public users;
  public roles;
  public pageId;
  public selectedRol;
  public isAdmin: boolean;
  public page: any;
  public rolesList: any;

  constructor(private router: ActivatedRoute,
              private alert: AlertService,
              public pageService: PageService) {
    this.search = '';
    this.users = [];
    this.isAdmin = false;
    this.roles = pageService.roles;
    this.selectedRol = '';
    this.page = {};
    this.pageId = this.router.snapshot.paramMap.get('id');
    this.rolesList = [];
  }

  ngOnInit() {
    this.getPage();
    this.getRolesList();
  }

  getPage() {
    this.pageService.pageById(this.pageId).subscribe(res => {
      if (res.ok) {
        if (res.isAdmin) {
          this.isAdmin = true;
          this.page = res.data;
        }
      }
    }, err => {
      this.alert.error('No se ha encontrado lo que buscas');
    });
  }

  searchUser(formSearchUser: NgForm) {
    this.alert.clear();
    if (!this.search) { return; }
    this.pageService.searchUsers(this.search).subscribe(res => {
      if (res.ok) {
        this.users = res.data;
        if (this.users.length <= 0) {
          this.alert.warn('No hay resultados para tu busqueda');
        }
      }
    }, err => console.log(err));
  }

  assignRol(user) {
    if (!user) {
      this.alert.error('Usuario no seleccionado');
      return;
    }

    if (!this.selectedRol) {
      this.alert.error('Seleccione un rol, para un usuario');
      return;
    }

    this.pageService.assignRol(this.selectedRol, user.usuario_id, this.pageId).subscribe(res => {
      if (res.ok) {
        this.alert.success(res.message);
        this.getRolesList();
      }
    }, err => {
        if (err.error) {
          this.alert.error(err.error.message);
        } else {
          console.log(err);
          this.alert.error('Error desconocido, no se pudo asignar el rol');
        }
    });
  }

  getRolesList() {
    this.pageService.getRoles(this.pageId).subscribe(res => {
      if (res.ok) {
        this.rolesList = res.data;
      }
    }, err => console.log(err));
  }
}
