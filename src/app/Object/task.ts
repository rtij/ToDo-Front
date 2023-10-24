import { Project } from "./Project";

export class Task{

    tasks:string;
    idproject:Project;
    isdone:boolean = false;
    datef?:Date;
    dates?:Date;
    idtask?:number;
    constructor(task:string, idproject:Project, datef?:Date, dates?:Date, ){
        this.tasks = task;
        this.idproject = idproject;
        this.dates = dates;
        this.datef = datef;
    }
}