import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable({
    providedIn: 'root',
})

export class LoggerService {
    public isLoggedin = false;
    user ? : User;
    constructor(){}
}
