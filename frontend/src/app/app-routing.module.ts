import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { RecFacilComponent } from './components/rec-facil/rec-facil.component';

import { AuthGuard, AuthGuard2 } from './auth.guard'

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
