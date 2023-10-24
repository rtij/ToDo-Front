import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  constructor(private l: LoadingBarService, private loginService: LoginService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }
  type: string = "";
  loader = this.l.useRef();
  active: boolean = true;

  getUser() {
    this.loader.start();
    this.loginService.getuser().subscribe(
      (res) => {
        this.loader.complete();
        this.getRefresh();
      },
      (err) => {
        if (this.active) {
          this.loader.complete();
          this.getUser();
        }
      }
    );
  }

  getRefresh() {
    this.loader.start();
    if (this.loginService.getRefToken()) {
      this.router.navigate(['/Administrateur']);
      this.loader.complete();
    } else {
      this.loginService.getRefresh().subscribe(
        (res) => {
          this.loader.complete();
          if (res == "error") {
            this.loginService.removeData();
            this.router.navigate(['/Login']);
            this.toastr.warning("Ce compte n'existe plus");
          } else {
            localStorage.setItem('xauth', res);
            this.router.navigate(['/Administrateur']);
          }
        },
        (err) => {
          console.log(err.error);
          this.getRefresh();
        }
      );
    }
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }
}
