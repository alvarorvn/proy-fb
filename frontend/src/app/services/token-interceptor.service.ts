import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';

import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) { }

  intercept(req, next) {
    let authService = this.injector.get(AuthService);
    console.log(authService.getToken());
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer `
      }
    })

    return next.handle(tokenizeReq);
  }
}