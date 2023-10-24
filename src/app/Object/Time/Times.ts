

// Some function to formate date from the server

import { Time } from "@angular/common";

export function getResultMonth(date:Date):number{
    console.log(date);
    let s = date.toString();
    let r = "";
    for(let n = 5; n<7;n++){
        r = r + s[n];
    }
    const result :any = r;
    return result;
}

export function GetResultTime(Date: Date, i: number = 11): Time {
    const it = Date.toString();
    var result = '';
    for (i; i <= 18; i++) {
        result = result + it[i];
    }
    const final_result: any = result;
    return final_result;
}

// Timer values getter

export function getTimeHours(Hours: Time, i = 0): number {
    const it = Hours.toString();
    var result = "";
    for (i; i < 2; i++) {
        result = result + it[i];
    }
    const hours: any = result;
    return hours;
}

export function getMinutes(Hours: Time, i = 3): number {
    const it = Hours.toString();
    var result = "";
    for (i; i < 5; i++) {
        result = result + it[i];
    }
    const minutes: any = result;
    return minutes;
}

export function getSecond(Hours: Time, i = 6): number {
    const it = Hours.toString();
    var result = "";
    for (i; i < 8; i++) {
        result = result + it[i];
    }
    const minutes: any = result;
    return minutes;
}

export function TimerUp(Hours: Time): Time {
    let it: any = "";
    let second: number = getSecond(Hours);
    let min: number = getMinutes(Hours);
    let Heure: number = getTimeHours(Hours);
    let minresult = "";
    let secondResult = "";
    let HeureRes = "";
    // check second
    let i: number = ++second;
    second = i;
    secondResult = second.toString();
    minresult = min.toString();
    HeureRes = Heure.toString();
    if (second < 10) {
        secondResult = "0" + second.toString();
    }
    if (second == 60) {
        ++min;
        second = 0;
        secondResult = "0" + second.toString();
        minresult = min.toString();
        if (min < 10) {
            minresult = "0" + min.toString();
        }
    }
    if (min == 60) {
        ++Heure;
        min = 0;
        minresult = "0" + min.toString();
        HeureRes = Heure.toString();
        if (Heure < 10) {
            HeureRes = "0" + Heure.toString();
        }
    }
    if (Heure == 24) {
        it = "00:00:00";
        return it;
    }
    it = HeureRes + ":" + minresult + ":" + secondResult;
    return it;
}

export function TimerDown(Hours: Time) {
    let it: any = "";
    let second: number = getSecond(Hours);
    let min: number = getMinutes(Hours);
    let Heure: number = getTimeHours(Hours);
    let minresult = "";
    let secondResult = "";
    let HeureRes = "";
    // check second
    let i: number = --second;
    second = i;
    secondResult = second.toString();
    minresult = min.toString();
    HeureRes = Heure.toString();
    if (second < 10) {
        secondResult = "0" + second.toString();
    }
    if (second < 0) {
        --min;
        second = 59;
        secondResult = second.toString();
        minresult = min.toString();
        if (min < 10) {
            minresult = "0" + min.toString();
        }
    }
    if (min < 0) {
        --Heure;
        min = 59;
        minresult = min.toString();
        HeureRes = Heure.toString();
        if (Heure < 0) {
            it = "00:00:00";
            return it;
        }
        if (Heure < 10) {
            HeureRes = "0" + Heure.toString();
        }
    }
    it = HeureRes + ":" + minresult + ":" + secondResult;
    return it;
}