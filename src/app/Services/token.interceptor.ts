import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: LoginService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");
    const xauth = localStorage.getItem("xauth");
    if (token) {
      let cloned = request.clone({
        headers: request.headers.append("Authorization", `Bearer ${token}`)
      });
      if (xauth) {
        cloned = cloned.clone({
          headers: cloned.headers.append("X-Auth-Token", xauth)
        });
      }
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
// .pipe(catchError((error: HttpErrorResponse) => {
//   if (error.error['message'] == "Expired JWT Token" && error.status === 401) {
//     return this.Handle401Error(request, next);
//   } else {
//     return throwError(error);
//   }
// }));
// } else {
// return next.handle(request);
// }
// }

// private addToken(request: HttpRequest<unknown>) {
// if (this.token) {
// let cloned = request.clone({
//   headers: request.headers.append("Authorization", `Bearer ${this.token}`)
// });
// if (this.xauth) {
//   cloned = cloned.clone({
//     headers: cloned.headers.append("X-Auth-Token", this.xauth)
//   });
//   // return cloned;
// }
// return cloned;
// }
// else {
// return request;
// }
// }

// private Handle401Error(request: HttpRequest<any>, next: HttpHandler) {
// console.log("Token expired");
// if (!this.isRefreshing) {
// this.isRefreshing = true;
// this.refreshTokenSubject.next(null);
// return this.authService.RefreshToken().pipe(
//   switchMap((res: any) => {
//     this.isRefreshing = false;
//     this.refreshTokenSubject.next(res.token);
//     return next.handle(this.addToken(request));
//   }));
// } else {
// return this.authService.RefreshToken().pipe(
//   filter(token => token != null),
//   take(1),
//   switchMap((res: any) => {
//     return next.handle(this.addToken(request));
//   }));
// }
