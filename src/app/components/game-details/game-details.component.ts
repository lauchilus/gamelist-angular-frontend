import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPlayed } from 'src/app/common/addPlayed';
import { Collections } from 'src/app/common/collections';
import { Game } from 'src/app/common/game';
import { DecodeToken } from 'src/app/helpers/decode-token';
import { GameService } from 'src/app/services/game-service.service';
import { __setFunctionName } from 'tslib';
import { DialogPlayedComponent } from '../dialog-played/dialog-played.component';
import { PostPlayed } from 'src/app/common/post-played';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  type: Collections[] = [];
  optionSelected: number;
  game!: Game;
  coverImageUrl: string = '';
  username:string;
  postBody: PostPlayed;


  constructor(private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private decodeJwt:DecodeToken,
    private dialog: MatDialog) {

  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPlayedComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el resultado no es nulo, significa que el usuario ha ingresado datos válidos
        console.log(`Datos ingresados:`, result);
        const postBody = new PostPlayed(this.game.id,result.review,result.rating);
        // Realiza la llamada al backend utilizando el servicio de backend
       this.addToPlayed(postBody);
       }
      });
    } 
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = this.decodeJwt.getUsernameToken();
      console.log(this.username+'desdegameDetails')
      const idParam = params.get('id');
      const keywordParam = params.get('keyword');

      if (idParam) {
        this.handleGameDetailsId();
      } else if (keywordParam) {
        this.handleGameDetailsName();
      }
    });
    this.getCollections();
    
  }

  onOpcionSeleccionadaChange() {
    console.log('Opción seleccionada:', this.optionSelected);
    // Puedes realizar acciones adicionales aquí según la opción seleccionada
  }

  handleGameDetailsName() {
    const theGameName: string = this.route.snapshot.paramMap.get("keyword")!;
    this.gameService.getGame(theGameName).subscribe(
      data => {
        this.game = data;
        this.coverImageUrl = this.getCoverImageData();
        console.log(this.game.id);
      }
    )
  }

  getCollections() {
    this.gameService.getGamesCollection('collections', this.username,0).subscribe(
      (data: any[]) => {
        this.type = data;
        this.type.forEach(game => {
          game.image = this.getCoverImageDataBis(game.image);
        });
      },
      (error: any) => {
        console.error("ERROOOR", error);
      }
    );

    console.log(this.type)
  }

  handleGameDetailsId() {
    const theGameName: number = +this.route.snapshot.paramMap.get("id")!;
    this.gameService.getGameById(theGameName).subscribe(
      data => {
        this.game = data;
        this.coverImageUrl = this.getCoverImageData();
        console.log(this.game.id);
      }
    )
  }

  addToPlayed(body:PostPlayed){    
    console.log(body)
        this.gameService.postPlayed(body,this.username).subscribe();
        console.log("entro")
        this.router.navigateByUrl("/category/played")
        
  }

  addToCollection(theType: string) {
    console.log(this.optionSelected);

    const theGame = new AddPlayed(this.game.id);
    switch (theType) {
      case 'collection':
       
        this.gameService.postGameToCollection(theGame, this.optionSelected).subscribe();
        console.log("entro")
        this.router.navigateByUrl('/category/collections');
        break;
      
      case 'playing':
        this.gameService.postPlaying(theGame,this.username).subscribe();
        this.router.navigateByUrl('/category/playing');
        console.log("entro playing")
        break;
      default:
        console.log("no category for that name or user");
        return null;
    }

  }



  getCoverImageData(): string {
    if (this.game && this.game.cover) {
      console.log('Generating cover image data...');
      const base64Image = this.game.cover; // El string recibido del backend
      return 'data:image/png;base64,' + base64Image;
    }
    return ''; // Manejo por si no hay imagen
  }

  getCoverImageDataBis(image: string): string {
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
