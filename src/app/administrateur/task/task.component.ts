import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { getMonthDays, MonthListe } from 'src/app/Object/Date/Dates';
import { getLocalTime } from 'src/app/Object/Time/Times';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.show();
  }
  dark:boolean = false;
  days:string[] = ["Mon", "Tue", "Wed","Thu", "Fri", "Sat", "Sun"];
  monthL:string[] = ["January", "February", "March", "April", "May","June","July","August","September", "October", "November", "December"];
  year:number = new Date().getFullYear();
  month:number = new Date().getMonth();
  result = getMonthDays(this.year, this.month);
  weekDay:number[] = this.result.result;
  monthname = this.monthL[this.month];
  actualday = new Date().getDate();
  actualmonth = new Date().getMonth();
  end:number = this.result.end;
  start = this.result.start; 

  Next(){
    this.month +=1;
    if(this.month == 12){
      this.year += 1;
      this.month = 0;
    }
    this.monthname = this.monthL[this.month];
    let r =  getMonthDays(this.year, this.month);
    this.weekDay =r.result;
    this.end = r.end;
    this.start = r.start;
  }
  Prev(){
    this.month -= 1;
    if(this.month < 0){
      this.year -= 1;
      this.month = 11;
    }
    this.monthname = this.monthL[this.month];
    let r =  getMonthDays(this.year, this.month);
    this.weekDay =r.result;
    this.end = r.end;
    this.start = r.start;
  }

  show(){
    // alert(new Date(this.year, this.month, 1));
    console.log(new Date(this.year, this.month, 32).getDay());
  }


}
