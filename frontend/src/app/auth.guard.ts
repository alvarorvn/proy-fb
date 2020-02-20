import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
//SI no esta logueado, mandalo a login
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
// Si esta logueado, mandalo a
export class AuthGuard2 implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!this.authService.loggedIn()) {
      return true;
    }

    this.router.navigate([`${this.authService.getId()}`]);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
// Si el usuario es del token, continua, si no corrige usuario
export class VerifyUser implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.getId() === null || this.authService.getToken() === null) {
      this.router.navigate([``]);
      return false;
    }

    if (route.params.iduser === this.authService.getId()) {
      return true;
    }

    this.router.navigate([`${this.authService.getId()}`]);
    return true;
  }
}
