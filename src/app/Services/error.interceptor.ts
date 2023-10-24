import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: LoginService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.error['message'] == "Expired JWT Token" && error.status === 401) {
        return this.authService.RefreshToken().pipe(
          switchMap((res: any) => {
            console.log(res);
            return next.handle(request);
          }));
      }
      return throwError(error)
    }));
  }
}
