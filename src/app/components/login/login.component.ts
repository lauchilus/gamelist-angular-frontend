import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{


  username: string = '';
  password: string = '';


  constructor(private authService: AuthService,
              private router: Router){

  }

  onSubmit() {
    // Aquí puedes agregar la lógica de autenticación, como enviar los datos al servidor.
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response && response.JWTToken) {
        localStorage.setItem('token', response.JWTToken);
        this.router.navigateByUrl('');
      }else{
        (error) => {
        console.error('Error de autenticación:', error);
        // Aquí puedes mostrar un mensaje de error al usuario o tomar otras acciones.
      }
      }
      
  });
    // Por ahora, solo mostraremos los valores en la consola.
    console.log(localStorage.getItem('token'))
    console.log('Nombre de usuario:', this.username);
    console.log('Contraseña:', this.password);
  }
}
