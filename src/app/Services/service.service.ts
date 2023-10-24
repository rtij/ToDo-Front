import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { User } from '../Object/Users';
import { url } from '../Object/url';
import { Project } from '../Object/Project';
import { Task } from '../Object/task';
import { DateToShortDate } from '../Object/function';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {
  }

  Projects: Project[] = [];

  newUser(u: User) {
    return this.http.post(url + 'api/user/create', { data: u }).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    );
  }

  UpdateUser(u: User) {
    return this.http.put(url + 'api/user/update/' + u.iduser, { data: u }).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    );
  }

  getProjectList(u: User) {
    return this.http.get(url + 'api/project/list/' + u.iduser).pipe(
      map((res: any) => {
        this.Projects = res['data'];
        this.Projects.forEach((item) => {
          item.idtask.forEach((it) => {
            if (it.datef) {
              it.datef = DateToShortDate(it.datef);
            }
            if (it.dates) {
              it.dates = DateToShortDate(it.dates);
            }
          })
        });
        return this.Projects;
      }),
      catchError(this.handleError)
    );
  }

  newProject(p: Project) {
    return this.http.post(url + 'api/project/create', { data: p }).pipe(
      map((res: any) => {
        this.Projects.push(res['data']);
        return this.Projects;
      }),
      catchError(this.handleError)
    );
  }

  updateProject(p: Project) {
    return this.http.put(url + 'api/project/update/' + p.idproject, { data: p }).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    );
  }

  SetTaskDone(t:Task){
    return this.http.get(url + 'api/task/done/' + t.idtask).pipe(
      map((res:any)=>{
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    );
  }

  DeleteProject(p: Project) {
    return this.http.delete(url + 'api/project/delete/' + p.idproject).pipe(
      map((res: any) => {
        this.Projects = res['data'];
        return this.Projects;
      }),
      catchError(this.handleError)
    );
  }

  newTask(t: Task) {
    return this.http.post(url + 'api/task/create/' + t.idproject?.idproject, { data: t }).pipe(
      map((res: any) => {
        let r = res["data"];
        return r;
      }),
      catchError(this.handleError)
    );
  }

  updateTask(t: Task) {
    return this.http.put(url + 'api/task/update/' + t.idtask, { data: t }).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    );
  }

  DeleteTask(t: Task) {
    return this.http.delete(url + 'api/task/delete/' + t.idtask).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    );
  }



  Destroy() {
    this.Projects = [];
  }

  // Handle Error
  private handleError(error: HttpErrorResponse) {
    // return an observable with a user friendly message
    return throwError(error);
  }
}
