import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { RecFacilComponent } from './components/rec-facil/rec-facil.component';

import { AuthGuard, AuthGuard2 } from './auth.guard'
import {ListPagesComponent} from "./components/pages/list-pages/list-pages.component";
import {AddPagesComponent} from "./components/pages/add-pages/add-pages.component";
import {EditPagesComponent} from "./components/pages/edit-pages/edit-pages.component";
import {ViewPagesComponent} from "./components/pages/view-pages/view-pages.component";
import {RolesPageComponent} from "./components/pages/roles-page/roles-page.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signInUp',
    component: LoginComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: 'recfacial',
    component: RecFacilComponent
  },
  // pages
  {
    path: ':iduser/pages',
    component: ListPagesComponent
  },
  {
    path: ':iduser/pages/add',
    component: AddPagesComponent
  },
  {
    path: ':iduser/pages/:id/edit',
    component: EditPagesComponent
  },
  {
    path: ':iduser/pages/roles/:id',
    component: RolesPageComponent
  },
  {
    path: ':iduser/page/:id',
    component: ViewPagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
