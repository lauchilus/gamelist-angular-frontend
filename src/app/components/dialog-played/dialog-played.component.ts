import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-played',
  templateUrl: './dialog-played.component.html',
  styleUrls: ['./dialog-played.component.css']
})
export class DialogPlayedComponent implements OnInit {
 // Propiedades para almacenar los datos ingresados por el usuario
 review: string = '';
 rating: number | null = null;

 constructor(
   public dialogRef: MatDialogRef<DialogPlayedComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) {}

 ngOnInit(): void {}

 // Método para guardar los datos y cerrar el diálogo
 guardarDatos(): void {
   // Comprueba si ambos campos tienen datos válidos
   if (this.review && this.rating !== null) {
     // Aquí puedes realizar cualquier validación adicional si es necesario

     // Crea un objeto con los datos ingresados
     const datos = {
       review: this.review,
       rating: this.rating,
     };

     // Cierra el diálogo y pasa los datos al componente principal
     this.dialogRef.close(datos);
   }
 }
}