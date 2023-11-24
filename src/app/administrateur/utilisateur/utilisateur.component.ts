import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Object/Users';
import { LoginService } from 'src/app/Services/login.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {

  
  constructor(private toastr: ToastrService, private l: LoadingBarService, private loginService: LoginService, private service: ServiceService) {
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
  User!: User;
  
  // forms
  username: string = "";
  password: string = "";
  confp: string = "";
  
  Save() {
    if (!this.User) {
      this.newUser();
    }else{
      this.UpdateUser();
    }
  }

  UpdateUser() {
    this.User.username = this.username;
    this.User.password = this.password;
    this.loader.start();
    this.service.UpdateUser(this.User).subscribe(
      (res) => {
        this.RefreshToken();
      },
      (err) => {
        this.loader.complete();
        if (this.active) {
          this.toastr.warning("Server error");
        }
      }
    );
  }


  
  RefreshToken() {
    this.loginService.RefreshToken().subscribe(
      (res) => {
        this.password = "";
        this.toastr.success("Registred successfully");
        this.loader.complete();
        this.modal = false;
      },
      (err)=>{
        this.Error(err);
        this.RefreshToken();
      }
    );
  }

  // Create new user
  newUser() {
    let u = new User(this.username, this.password);
    this.loader.start();
    this.service.newUser(u).subscribe(
      (res) => {
        this.User = res;
        this.username = this.User.username;
        this.toastr.success("Registred successfully");
        this.loader.complete();
      },
      (err) => {
        this.loader.complete();
        if (this.active) {
          this.toastr.warning("Server error");
        }
      }
    );
  }
  // getData
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
