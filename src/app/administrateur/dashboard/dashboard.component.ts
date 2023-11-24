import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { ServerData } from 'src/app/Object/Data/DataManager';
import { DataComponentsManager } from 'src/app/Object/Data/DataComponentsManager';
import { Project } from 'src/app/Object/Project';
import { User } from 'src/app/Object/Users';
import { CrudService } from 'src/app/Services/crud.service';
import { LoginService } from 'src/app/Services/login.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent<T> implements OnInit, DataComponentsManager<T>{


  constructor(private toastr: ToastrService, private l: LoadingBarService, private loginService: LoginService, private service: ServiceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  loader = this.l.useRef();
  // state
  active: boolean = true;
  modal: boolean = false;
  getdata: boolean = true;
  // Data
  data: ServerData[] = [];
  User!: User;
  Projects: Project[] = [];

  // forms
  username: string = "";
  password: string = "";
  confp: string = "";


  Edit() {
    this.modal = true;
  }


  // getData function
  getData(){
    const data:any = this.route.snapshot.data;
    let entity = data.entity;
    let index = 0;
    // let d = this.crudService.Data.find((item)=>{return item.name == entity[index].type});
    // if(d){

    // }
  }

  getUser() {
    let u = this.loginService.User;
    this.loader.start();
    if (u) {
      this.User = u;
      this.username = u.username;
      this.loader.complete();
      this.getdata = false;
    } else {
      this.loginService.getuser().subscribe(
        (res) => {
          this.User = res;
          this.username = this.User.username;
          this.loader.complete();
          this.getdata = false;
        },
        (err) => {
          this.loader.complete();
          if (this.active) {
            this.getUser();
            this.Error(err);
          }
        }
      );
    }
  }

  getProjectsList() {
    let p = this.service.Projects;
    this.loader.start();
    if (p.length != 0) {
      this.Projects = p;
      this.loader.complete();
    } else {
      this.service.getProjectList(this.User).subscribe(
        (res) => {
          this.Projects = res;
          this.loader.complete();
        },
        (err) => {
          this.loader.complete();
          if (this.active) {
            this.getProjectsList();
            this.Error(err);
          }
        }
      );
    }
  }

  Error(error: any) {
    this.loader.complete();
    if (error.error['message'] != "Expired JWT Token") {
      console.log(error.error);
      this.toastr.warning("Server error");
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }
}
