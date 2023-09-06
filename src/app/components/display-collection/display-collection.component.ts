import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collections } from 'src/app/common/collections';
import { ListGames } from 'src/app/common/list-games';
import { Playing } from 'src/app/common/playing';
import { GameService } from 'src/app/services/game-service.service';

@Component({
  selector: 'app-display-collection',
  templateUrl: './display-collection.component.html',
  styleUrls: ['./display-collection.component.css']
})
export class DisplayCollectionComponent implements OnInit {

  listGamesvar: any[] = [];
  collectionInfo: boolean = false;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GameService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params)=>{
      const id = params['id'];
      if (params['id'] && params['id'].length > 0 && params['id'] === 'collection'){
        this.getCollectionInfo();
      }
        this.doSomething()
      });
    
    }
  
    doSomething() {
    this.collectionInfo= this.route.snapshot.paramMap.has('id');
    
    if(this.collectionInfo){
      this.getCollectionInfo();
    } else{
      this.listGames();
    }
  }
    

  
  getCollectionInfo() {
    const theId : string = this.route.snapshot.paramMap.get('id');
    this.service.getCollectionById(theId).subscribe(
      (data: any[]) => {
        this.listGamesvar = data;
        this.listGamesvar.forEach(game => {
          game.image = this.getCoverImageData(game.image);
        });
      },
      (error: any) => {
        console.error("ERROOOR",error);
      }
    );
  }

  isCollectionsRoute(): boolean {
    return this.route.snapshot.url[1]?.path === 'collections';
  }

  isCollection(): boolean {
    console.log(this.route.snapshot.paramMap.has('id'))
    return this.route.snapshot.paramMap.has('id');
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


