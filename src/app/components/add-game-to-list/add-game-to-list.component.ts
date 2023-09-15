import { Component } from '@angular/core';

@Component({
  selector: 'app-add-game-to-list',
  templateUrl: './add-game-to-list.component.html',
  styleUrls: ['./add-game-to-list.component.css']
})
export class AddGameToListComponent {

  isDropdownOpen = false;

  type: string[] = ['played','playing','collection'];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  doSomething() {
    // Aquí puedes realizar alguna acción cuando se selecciona una opción del dropdown.
    console.log('Opción seleccionada');
  }
}
