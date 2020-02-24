import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { RecFacilComponent } from './components/rec-facil/rec-facil.component';
import { BiografiaComponent } from './components/biografia/biografia.component';

import { AuthGuard, AuthGuard2, VerifyUser } from './auth.guard'
import { VerchatsComponent } from './components/verchats/verchats.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
