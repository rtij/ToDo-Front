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
  export function getMonthDays(y:number, m:number){
    let d:number[] = [];
    let date = new Date(y, m, 1);
    let i = date.getDay();
    if(i != 1){
        for(let a= 1; a<i;a++){
            d.push(new Date(y, m, 1-a).getDate());
        }    
    }
    d = d.sort((a,b)=>{
        if(a>b){
            return 1;   
        }else{
            return -1;
        }
    });
    let start = d.length -1;
    i = 1;
    while(new Date(y, m, i).getMonth() == m) {
        d.push(new Date(y,m,i).getDate());
        i+=1;
    }
    let day =  new Date(y, m, i).getDay();
    let end = d.length - 1;
    if(day != 1){
        let a = 1;
        while(d.length % 7 != 0){
            d.push(a);
            a++;
        }
    }
    
    return {"result": d,"start": start,"end": end};
}