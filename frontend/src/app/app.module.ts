import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MomentModule} from 'ngx-moment';
import 'moment/locale/es';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { TextareaAutosizeModule } from "ngx-textarea-autosize";
import { NgSelectModule } from "@ng-select/ng-select";

import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth.guard";
import { IndexComponent } from "./components/index/index.component";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { RecFacilComponent } from "./components/rec-facil/rec-facil.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PostsComponent } from "./components/posts/posts.component";
import { CreatePostComponent } from "./components/create-post/create-post.component";
import { BiografiaComponent } from "./components/biografia/biografia.component";
import { VerchatsComponent } from "./components/verchats/verchats.component";
import { BuscarpersonasComponent } from "./components/buscarpersonas/buscarpersonas.component";
import { PerfilAmigoComponent } from "./components/perfil-amigo/perfil-amigo.component";
import { MarketplaceComponent } from "./components/marketplace/marketplace.component";
import { VerVentasComponent } from './components/ver-ventas/ver-ventas.component';
import { VerGuardadosComponent } from './components/ver-guardados/ver-guardados.component';
import { VerconectadosComponent } from './components/verconectados/verconectados.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ListPagesComponent } from './components/pages/list-pages/list-pages.component';
import { AddPagesComponent } from './components/pages/add-pages/add-pages.component';
import {AlertComponent} from './components/_partials/alert.component';
import {AlertService} from "./services/alert.service";
import { EditPagesComponent } from './components/pages/edit-pages/edit-pages.component';
import { ViewPagesComponent } from './components/pages/view-pages/view-pages.component';
import { FollowersPageComponent } from './components/pages/_partials/followers-page/followers-page.component';
import { ImagesPageComponent } from './components/pages/_partials/images-page/images-page.component';
import { PublicationsPageComponent } from './components/pages/_partials/publications-page/publications-page.component';
import { FrmPublicationComponent } from './components/pages/_partials/frm-publication/frm-publication.component';
import { VideoPageComponent } from './components/pages/_partials/video-page/video-page.component';
import { RolesPageComponent } from './components/pages/roles-page/roles-page.component';
import { ListRolesComponent } from './components/pages/roles-page/list-roles/list-roles.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    RecFacilComponent,
    NavbarComponent,
    PostsComponent,
    CreatePostComponent,
    BiografiaComponent,
    BiografiaComponent,
    VerchatsComponent,
    BuscarpersonasComponent,
    PerfilAmigoComponent,
    MarketplaceComponent,
    VerVentasComponent,
    VerGuardadosComponent,
    VerconectadosComponent,
    EventosComponent,
    ListPagesComponent,
    AddPagesComponent,
    AlertComponent,
    EditPagesComponent,
    ViewPagesComponent,
    FollowersPageComponent,
    ImagesPageComponent,
    PublicationsPageComponent,
    FrmPublicationComponent,
    VideoPageComponent,
    RolesPageComponent,
    ListRolesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    }),
    TextareaAutosizeModule,
    NgSelectModule,
    MomentModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AlertService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
