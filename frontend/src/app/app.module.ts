import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

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
    VerGuardadosComponent
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
    NgSelectModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
