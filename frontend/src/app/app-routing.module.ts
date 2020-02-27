import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { RecFacilComponent } from './components/rec-facil/rec-facil.component';
import { BiografiaComponent } from './components/biografia/biografia.component';
import { AuthGuard, AuthGuard2, VerifyUser } from './auth.guard';
import { VerchatsComponent } from './components/verchats/verchats.component';
import { BuscarpersonasComponent } from './components/buscarpersonas/buscarpersonas.component';
import { PerfilAmigoComponent } from './components/perfil-amigo/perfil-amigo.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { VerconectadosComponent } from './components/verconectados/verconectados.component';
import {ListPagesComponent} from './components/pages/list-pages/list-pages.component';
import {AddPagesComponent} from './components/pages/add-pages/add-pages.component';
import {EditPagesComponent} from './components/pages/edit-pages/edit-pages.component';
import {ViewPagesComponent} from './components/pages/view-pages/view-pages.component';
import {RolesPageComponent} from './components/pages/roles-page/roles-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: 'recfacial',
    component: RecFacilComponent
  },
  {
    path: ':iduser',
    component: IndexComponent,
    canActivate: [VerifyUser]
  },
  {
    path: ':iduser/biografia',
    component: BiografiaComponent
  },
  {
    path: ':iduser/verchats',
    component: VerchatsComponent
  },
  {
    path: 'verconectados/',
    component: VerconectadosComponent
  },
  {
    path: 'buscarpersonas/:usr_busq',
    component: BuscarpersonasComponent
  },
  {
    path: ':iduser/biografia/:idamigo',
    component: PerfilAmigoComponent,
    canActivate: [VerifyUser]
  },
  {
    path: ':iduser/marketplace',
    component: MarketplaceComponent,
    canActivate: [VerifyUser]
  },
  {
    path: ':iduser/eventos',
    component: EventosComponent
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
