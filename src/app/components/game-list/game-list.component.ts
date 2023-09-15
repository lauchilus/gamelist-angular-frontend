import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListGames } from 'src/app/common/list-games';
import { GameService } from 'src/app/services/game-service.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.grid.component.html',
  //templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  listGamesvar: ListGames[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: GameService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(()=>{
      this.listGames();
    console.log(this.listGamesvar);
    })
    

  }

  listGames() {
    this.service.getGamesList().subscribe(
      (data: ListGames[]) => {
        console.log(data);
        this.listGamesvar = data.filter(game => game !== null);
  
        // Iterar sobre los juegos después de recibir y filtrar los datos
        this.listGamesvar.forEach(game => {
          game.image = this.getCoverImageData(game.image);
        });
      }
    );
  }
  
  getCoverImageData(image: string): string {
    if (image != null && image.length > 0) {
      console.log('Generating cover image data...');
      return 'data:image/png;base64,' + image; // Ya que `image` es el string en base64
    }
    return ''; // Manejo por si no hay imagen
  }
  
  arrayBufferToBase64(buffer: Uint8Array): string {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return window.btoa(binary);
  }
  
}
