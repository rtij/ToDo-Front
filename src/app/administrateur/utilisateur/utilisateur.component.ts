import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Object/Users';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {

  constructor( private toastr: ToastrService, private l: LoadingBarService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUtilisateur();
  }
  // page state
  active:boolean = true;
  // 
  loader = this.l.useRef();
  onsend: boolean = false;
  Users: User[] = [];
  search: string = '';
  box: boolean = false;
  n: any = null;
  modifp: boolean = false;
  page:number=1;

  username: string = "";
  password: string = "";
  confp: string = "";
  attribution: string = "";
  SelectedU!: User;

  Reset() {
    this.username = "";
    this.password = "";
    this.attribution = "";
    this.confp = "";
    this.SelectedU = this.n;
  }

  New() {
    this.box = true;
    this.modifp = true;
    this.Reset();
  }

  Close() {
    this.box = false;
    this.Reset();
  }

  SelectU(u: User) {
    this.SelectedU = u;
    this.username = u.username;
    this.modifp = false;
  }

  Modifp() {
    this.modifp = true;
  }

  Modify() {
    if (!this.SelectedU) {
      this.toastr.warning("Veuillez selectionné un utilisateur");
    } else {
      this.box = true;
      this.modifp = false;
    }
  }

  Save() {
    if (!this.SelectedU) {
      this.NewUtilisateur();
    } else {
      this.UpdateUtilisateur();
    }
  }

  NewUtilisateur() {
  }

  UpdateUtilisateur() {
  }

  DeleteUtilisateur() {
    if (!this.SelectedU) {
      this.toastr.warning("Veuillez selectionné un utilisateur");
    } else {
      if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
        this.loader.start();
        this.onsend = true;
        
      }
    }
  }

  //get Data function start
  getUtilisateur() {
    // this.loader.start();
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
    this.active= false;
  }
}
