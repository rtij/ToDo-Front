export class User{
    username:string;
    password:string;
    usedark:boolean = false;
    iduser?:number;
    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }
}