import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggerService } from '../common/logger-service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(private http: HttpClient, private jwtHelper: JwtHelperService,private loggerService: LoggerService) {}

baseUrl: string = 'http://localhost:8080/auth';

login(username: string, password: string) {
  const loginUrl = `${this.baseUrl}/login`;
  this.loggerService.isLoggedin = true;
  return this.http.post<string>(loginUrl, { username, password });
}

register(username: string, password: string) {
  const registerUrl = `${this.baseUrl}/register`
  return this.http.post<string>(registerUrl, { username, password });
}

logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

getToken(): string | null {
  return localStorage.getItem('token');
}

setToken(token: string) {
  localStorage.setItem('token', token);
}

checkLogin() {
  const token = localStorage.getItem('token');
  console.log(!!token)
  return !!token;
}

}