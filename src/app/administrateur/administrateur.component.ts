import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../Services/login.service';
import { User } from '../Object/Users';
import { ServiceService } from '../Services/service.service';
@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent implements OnInit {


  constructor(private router: Router, private LoginService: LoginService, private l: LoadingBarService, private toastr: ToastrService, private service:ServiceService) { }

  ngOnInit(): void {
    this.getUser();
  }
  loader = this.l.useRef();
  // page state 
  active: boolean = true;
  // themes state
  dark:boolean =false;
  // 
  paramsbox:boolean  = false;
  onsend:boolean = false;


  User!:User;
  // Save user themes
  SaveUserThemes(){
    this.User.usedark = !this.User.usedark;
    this.loader.start();
    this.service.UpdateUser(this.User).subscribe(
      (res)=>{
        this.loader.complete();
      },
      (err)=>{
        this.loader.complete();
        if (this.active) {
          this.Error(err);
          this.toastr.warning("Server error");
        }
      }
    );
  }

  // 
  Logout() {
    this.loader.start();
    this.LoginService.Logout().subscribe(
      (res) => {
        this.loader.complete();
        this.LoginService.removeData();
        this.router.navigate(['/Login']);
      },
      (err) => {
        this.loader.complete();
        this.Error(err);
      }
    );
  }

  // getData function

  getUser() {
    let u = this.LoginService.User;
    this.loader.start();
    if (u) {
      this.User = u;
      this.dark = u.usedark;
      this.loader.complete();
    } else {
      this.LoginService.getuser().subscribe(
        (res) => {
          this.User = res;
          this.dark = this.User.usedark;
          this.loader.complete();
        },
        (err) => {
          this.loader.complete();
          if (this.active) {
            this.Error(err);
            this.getUser();
          }
        });
    }
  }

  // Error handler 
  Error(error: any) {
    this.loader.complete();
    if (error.error['message'] && error.error['message'] != "Expired JWT Token") {
      console.log(error.error);
      this.toastr.warning("Server error");
    }
  }


  // 
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
    this.service.Destroy();
  }
}
