import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { url } from '../Object/url';
import { DateToShortDate } from '../Object/function';
import { ServiceData, ServiceDataManager } from '../Object/Data/DataManager';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  constructor(private http:HttpClient, private serviceDataManager:ServiceDataManager<T>) { }

  Data:ServiceData = [];
  

  cerate(type: new ()=>T, instance:T){
    return this.http.post(url+ `api/${type.name}/create`, {data:instance}).pipe(
      map((res:any)=>{
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    );
  }

  readOneType(type: new ()=> T, instance:T): Observable<T>{
    return this.http.get<T>(url + `api/${type.name}/${'id'+type.name.toLowerCase()}`).pipe(
      map((res:any)=>{
        let r:T = res['data'];
        return r;
      }),
      catchError(this.handleError)
    );
  }

  read(type:new ()=> T): Observable<T[]> {
    return this.http.get<T[]>(url+`api/${type.name}/liste`).pipe(
      map((res:any)=>{
        let r:T[] = res['data'];
        let dateAttribute:string[] = this.formateTypeDates(type);
        if(dateAttribute.length != 0){
          r = this.DataFormateDate(r, dateAttribute);
        }
        this.Data = this.serviceDataManager.DataSetter(type, this.Data, res['data']);
        return r;
      }),
      catchError(this.handleError)
    );
  }

  update(type:new ()=> T, instance:T, index:number) : Observable<T[]>{
    return this.http.put<T[]>(url + `api/${type.name}/update/${'id'+type.name.toLowerCase()}`, {data:instance}).pipe(
      map((res:any)=>{
        let r:T[] = res['data'];
        let dateAttribute:string[] = this.formateTypeDates(type);
        if(dateAttribute.length != 0){
          r = this.DataFormateDate(r, dateAttribute);
        }
        return r;
      }),
      catchError(this.handleError)
    );
  }


  delete(type:new ()=> T, instance:T) : Observable<T[]>{
    return this.http.delete<T[]>(url + `api/${type.name}/update/${'id'+type.name.toLowerCase()}`).pipe(
      map((res:any)=>{
        let r:T[] = res['data'];
        let dateAttribute:string[] = this.formateTypeDates(type);
        if(dateAttribute.length != 0){
          r = this.DataFormateDate(r, dateAttribute);
        }
        return r;
      }),
      catchError(this.handleError)
    );
  }


  formateTypeDates(obj:any): string[]{
    const dateAttribute:string[] = [];
    for(const key in obj){
      if(obj.hasOwnProprety(key)){
        const value = obj[key];
        if(value instanceof Date){
          dateAttribute.push(value.constructor.name);
        }
      }
    }
    return dateAttribute;
  }


  // Service Date formater
  DataFormateDate(data: Array<T>, dateAttributes:string[]){
    data.forEach((item:any)=>{
      dateAttributes.forEach((it)=>{
        item[it] = DateToShortDate(item[it]);
      });
    });
    return data;
  }


  //Error  Handle 
  private handleError(error: HttpErrorResponse) {
    // return an observable with a user friendly message
    return throwError(error);
  }
}
