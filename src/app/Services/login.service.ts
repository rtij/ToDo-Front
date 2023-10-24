import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { url } from '../Object/url';
import { User } from '../Object/Users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private http: HttpClient) {
  } 
  User!:User;

  CheckUser(u:string){
    return this.http.post(url + 'api/users/refresh/first', {data:u}).pipe(
      map((res:any)=>{
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    )
  }

  RefreshToken(){
    return this.http.get(url + 'api/users/refresh/token').pipe(
      map((res:any)=>{
        let r = res['data'];
        localStorage.setItem('token', r);
      }));
  }

  getRefresh(){
    return this.http.get(url +'api/users/refresh/user/' + this.User.iduser).pipe(
      map((res:any)=>{
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    );
  }

  getuser(){
    return this.http.get(url +'api/users/actual').pipe(
      map((res:any)=>{
        this.User = res['data'];
        return this.User;
      })
    );
  }

  Login(username:string, password:string){
    return this.http.post(url + 'api/login_check',{username, password}).pipe(
      map((res:any)=>{
        let r = res['token'];
        return r;
      }),
      catchError(this.handleError)
    );
  }

  Logout(){
    return this.http.get(url + 'api/users/refresh/logout').pipe(
      map((res:any)=>{
      }),
      catchError(this.handleError)
    )
  }

  // Socket Services

  isLogedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public removeData() {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('xauth');
    let n:any = null;
    this.User = n;
  }

  public getToken() {
    const ls = localStorage.getItem('token');
    return ls;
  }

  public getRefToken(){
    const ls = localStorage.getItem('refrresh');
    return ls;
  }

  public storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Handle Error
  private handleError(error: HttpErrorResponse) {
    // return an observable with a user friendly message
    return throwError(error);
  }
}
