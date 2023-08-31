import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/common/game';
import { GameService } from 'src/app/services/game-service.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent  implements OnInit  {


  game!: Game;
  coverImageUrl: string = '';

  constructor(private route: ActivatedRoute,
    private gameService: GameService){

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const keywordParam = params.get('keyword');
  
      if (idParam) {
        this.handleGameDetailsId();
      } else if (keywordParam) {
        this.handleGameDetailsName();
      }
    });
  }

  handleGameDetailsName() {
    const theGameName: string = this.route.snapshot.paramMap.get("keyword")!;
    this.gameService.getGame(theGameName).subscribe(
      data =>{
        this.game = data;
        this.coverImageUrl = this.getCoverImageData();
        console.log(this.game.id);
      }
    )
  }

  handleGameDetailsId(){
    const theGameName: number = +this.route.snapshot.paramMap.get("id")!;
    this.gameService.getGameById(theGameName).subscribe(
      data =>{
        this.game = data;
        this.coverImageUrl = this.getCoverImageData();
        console.log(this.game.id);
      }
    )
  }

 

  getCoverImageData(): string {
    if (this.game && this.game.cover) {
      console.log('Generating cover image data...');
      const base64Image = this.game.cover; // El string recibido del backend
      return 'data:image/png;base64,' + base64Image;
    }
    return ''; // Manejo por si no hay imagen
  }

  arrayBufferToBase64(buffer: Uint8Array): string {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return window.btoa(binary);
  }

}
