import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListGames } from 'src/app/common/list-games';
import { Playing } from 'src/app/common/playing';
import { GameService } from 'src/app/services/game-service.service';

@Component({
  selector: 'app-display-collection',
  templateUrl: './display-collection.component.html',
  styleUrls: ['./display-collection.component.css']
})
export class DisplayCollectionComponent implements OnInit {

  listGamesvar: Playing[] = [];
  

  constructor(
    private route: ActivatedRoute,
    private service: GameService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(()=>{
      this.listGames();
    console.log("funcionaaa");
    })
    

  }


  listGames() {
    const keyword: string = this.route.snapshot.paramMap.get("keyword");
    this.service.getGamesCollection(keyword, 'lauchilus').subscribe(
      (data: Playing[]) => {
        console.log(data);
        this.listGamesvar = data.filter(game => game !== null);
  
        // Convertir los datos de imagen en formato Uint8Array a base64 en el componente
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


