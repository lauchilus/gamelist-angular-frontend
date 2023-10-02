import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';


  constructor(private authService: AuthService,
              private router: Router){

  }

  onSubmit() {
    // Aquí puedes agregar la lógica de autenticación, como enviar los datos al servidor.
   
    this.authService.register(this.username, this.password).subscribe(
      (Response :String) => {
        if(Response === "Username is taken! "){
          alert("Username Taken!")
        }else{
          this.router.navigateByUrl('');
        }
      }
      
    )
      
  
    // Por ahora, solo mostraremos los valores en la consola.
    console.log(localStorage.getItem('token'))
    console.log('Nombre de usuario:', this.username);
    console.log('Contraseña:', this.password);
  }

}
