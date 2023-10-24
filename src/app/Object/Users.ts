export class User{
    username:string;
    password:string;
    iduser?:number;
    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }
}