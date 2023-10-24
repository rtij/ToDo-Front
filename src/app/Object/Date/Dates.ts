import { WeekDay } from "@angular/common";

export function getActualMonth(d: Date) {

}

export let MonthListe:any = [
    {
        lang: 'fr',
        list: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
    },
    {
        lang: 'eng',
        list: ["January", "February,", "Mars", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
];


// Get Days of the week

export function DateMaker(month:number, day:number, year?:number){
    let r = new Date(new Date().getFullYear(), month, day);
    return r;
  }
export function getWeekDays(){
    let t = new Date();
    let weekDay = [];
    let d = new Date().getDay();
    let n = -1;
    for(let i=d-1; i>0;i--){
      let date = DateMaker(t.getMonth(), t.getDate() + n);
      if(date.getMonth() != t.getMonth()){
        break;
      }
      weekDay.push(DateMaker(t.getMonth(), t.getDate() + n).getDate());
      n-=1;
    }
    n=0;
    for(let i=d; i<=7;i++){
      let date = DateMaker(t.getMonth(), t.getDate() + n);
      if(date.getMonth() != t.getMonth()){
        break;
      }
      weekDay.push(DateMaker(t.getMonth(), t.getDate() + n).getDate());
      n+=1;
    }
    return weekDay;
  }

export function getMonthDays(month:number, year:number){
    let day = 1;
    let days:number[] = [];
    while(DateMaker(month, day).getMonth() == month){
        days.push(day);
        day+=1;
    }
    return days;
  }