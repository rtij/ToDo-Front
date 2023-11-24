import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  //modal state
  modalShow:boolean = false;

  // Modal content
  title?:string;

  Show(){
    this.modalShow = true;
  }

  Close(){
    this.modalShow = false;
  }
}
