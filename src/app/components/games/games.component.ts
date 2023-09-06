import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collections } from 'src/app/common/collections';
import { ListGames } from 'src/app/common/list-games';
import { Playing } from 'src/app/common/playing';
import { GameService } from 'src/app/services/game-service.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  listGamesvar: ListGames[] = [];
  collectionInfo: boolean = false;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GameService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(()=>{
      this.service.getCollectionById(this.route.snapshot.paramMap.get('id')!).subscribe(
        (data: any[]) => {
          this.listGamesvar = data;
          this.listGamesvar.forEach(game => {
            game.image = this.getCoverImageData(game.image);
          });
        },
        (error: any) => {
          console.error("ERROOOR",error);
        }
      )});
    
    }   


    getCoverImageData(image: string){   
      console.log('Generating cover image data...');
      return 'data:image/png;base64,' + image; // Ya que `image` es el string en base64
    
    
  }
  
  arrayBufferToBase64(buffer: Uint8Array): string {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return window.btoa(binary);
  }
}

