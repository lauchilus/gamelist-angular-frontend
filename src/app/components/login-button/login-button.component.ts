import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {
  
  buttonName: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.updateButtonState();
  }

  onSubmit() {
    if (this.authService.isAuthenticated()) {
      // El usuario está logueado, realiza la lógica de cierre de sesión
      this.authService.logout();
    } else {
      // El usuario no está logueado, realiza la lógica de inicio de sesión
      this.router.navigateByUrl('login');
    }
  }

  updateButtonState() {
    if (this.authService.isAuthenticated()) {
      this.buttonName = 'LogOut';
    } else {
      this.buttonName = 'LogIn';
    }
  }
}
