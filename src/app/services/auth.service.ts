import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

login(username: string, password: string) {
  return this.http.post('/api/login', { username, password });
}

logout() {
  // Implementa la lógica para cerrar sesión aquí
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
}