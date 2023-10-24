import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private router: Router, private LoginService: LoginService, private l: LoadingBarService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loader = this.l.useRef();
  username: string = "";
  password: string = "";
  onsend: boolean = false;

  Login() {
    if (this.username == "") {
      this.toastr.warning("Username required");
    }
    if (this.password == "") {
      this.toastr.warning("Password required");
    }
    if (this.username != "" && this.password != "") {
      this.loader.start();
      this.onsend = true;
      this.LoginService.CheckUser(this.username).subscribe(
        (res)=>{
          if(res == "ok"){
            this.LoginUser();
          }else if(res == "error"){
            this.loader.complete();
            this.toastr.warning("Wrong username or password !");
            this.onsend = false;
          }
        },
        (err)=>{
          this.loader.complete();
          console.log(err.error);
          this.toastr.warning("Nom d'utilisateur on mot de passe incorrect");
          this.onsend = false;
        }
      )
    }
  }

  LoginUser(){
    this.LoginService.Login(this.username, this.password).subscribe(
      (res) => {
        localStorage.setItem('token', res);
        this.loader.complete();
        this.onsend = false;
        this.router.navigate(['/Loading']);
      },
      (err) => {
        this.loader.complete();
        console.log(err.error);
        this.toastr.warning("Nom d'utilisateur on mot de passe incorrect");
        this.onsend = false;
      }
    );
  }


}
