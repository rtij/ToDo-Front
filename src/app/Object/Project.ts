import { Task } from "./task";

export class Project{
    description:string;
    title:string;
    issup:boolean = false;
    repeats:boolean = false;
    idtask:Task[] = [];
    idproject?:number;
    constructor(title:string,description:string){
        this.description = description;
        this.title = title;
    }
}