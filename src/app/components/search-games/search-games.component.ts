import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/common/game';
import { ListGames } from 'src/app/common/list-games';
import { GameService } from 'src/app/services/game-service.service';

@Component({
  selector: 'app-search-games',
  templateUrl: './search-games.component.html',
  styleUrls: ['./search-games.component.css']
})
export class SearchGamesComponent implements OnInit {

searchGamesVar: Game[] = [];

constructor(
  private service:GameService,
  private route: ActivatedRoute
){}

  ngOnInit(): void {
   this.route.paramMap.subscribe(()=>{
    this.listGames();
   })
  }


  listGames() {
    const theGameName: string = this.route.snapshot.paramMap.get("keyword");
    this.service.searchGamesByName(theGameName).subscribe(
      (data: Game[]) => {
        console.log(data);
        this.searchGamesVar = data.filter(game => game !== null);
  
        // Iterar sobre los juegos después de recibir y filtrar los datos
        this.searchGamesVar.forEach(game => {
          game.cover = this.getCoverImageData(game.cover);
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
