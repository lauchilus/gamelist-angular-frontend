import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collections } from 'src/app/common/collections';
import { ListGames } from 'src/app/common/list-games';
import { Playing } from 'src/app/common/playing';
import { GameService } from 'src/app/services/game-service.service';
import jwtDecode from 'jwt-decode';
import { DecodeToken } from 'src/app/helpers/decode-token';
import { CollectionPage } from 'src/app/common/collection-page';

@Component({
  selector: 'app-display-collection',
  templateUrl: './display-collection.component.html',
  styleUrls: ['./display-collection.component.css']
})
export class DisplayCollectionComponent implements OnInit {

  listGamesvar: any[] = [];
  collectionPage: CollectionPage ;
  collectionInfo: boolean = false;
  username:string;
  currentPage = 1;
  totalPages: number;
  itemsPerPage = 10;
  page:number=0;
  


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GameService,
    private decodeToken: DecodeToken
  ) { }

  ngOnInit(): void {
  this.username = this.decodeToken.getUsernameToken();
  console.log(this.username+'desde displaycollection')
    this.route.paramMap.subscribe((params) => {
      const id = params['id'];
      if (params['id'] && params['id'].length > 0 && params['id'] === 'collection') {
        this.getCollectionInfo();
      }
      this.doSomething()
    });
    
    
  }

  doSomething() {
    this.collectionInfo = this.route.snapshot.paramMap.has('id');

    if (this.collectionInfo) {
      this.getCollectionInfo();
    } else {
      this.listGames();
    }
  }



  getCollectionInfo() {
    const theId: number = +this.route.snapshot.paramMap.get('id');
    this.service.getCollectionById(theId,this.currentPage-1).subscribe(
      (data: CollectionPage) => {
        this.collectionPage = data;
        this.totalPages = data.pagination.totalPages;
        
        this.listGamesvar = data.collections;
        this.listGamesvar.forEach(game => {
          game.image = this.getCoverImageData(game.image);
        });
      },
      (error: any) => {
        console.error("ERROOOR", error);
      }
    );
  }


  isCollectionsRoute(): boolean {
    return this.route.snapshot.url[1]?.path === 'collections';
  }

  isPlayedRoute(): boolean {
    return this.route.snapshot.url[1]?.path === 'played';
  }
  isPlayingRoute(): boolean {
    return this.route.snapshot.url[1]?.path === 'playing';
  }

  isCollection(): boolean {
    console.log(this.route.snapshot.paramMap.has('id'))
    return this.route.snapshot.paramMap.has('id');
  }
  isCollectionsGamesRoute(): boolean {
    return this.route.snapshot.url[0]?.path === 'collection';
  }

  nextPage() {
    console.log(this.totalPages+'SSSSSSSSSSSSSS')
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.page++;
      console.log(this.currentPage)
      this.listGames();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.page--;
      this.doSomething();
    }
  }

  changePage(thePage:number){
    this.currentPage = thePage;
    this.page = thePage;
    this.doSomething();
  }


  listGames() {
    const keyword: string = this.route.snapshot.paramMap.get("keyword");
    console.log(keyword)
    if(keyword==="collections"){
      this.service.getGamesCollection(keyword, this.username,this.currentPage-1).subscribe(
        (data: CollectionPage) => {
          console.log(data);
          this.collectionPage = data;
          this.totalPages = data.pagination.totalPages;
  
          // Convertir los datos de imagen en formato Uint8Array a base64 en el componente
          this.collectionPage.collections.forEach(game => {
            game.image = this.getCoverImageData(game.image);
            console.log(game.id,game.game_id)
          });
          this.listGamesvar = this.collectionPage.collections;
        }
      );
    }else{
      this.service.getGamesCollection(keyword, this.username,this.page).subscribe(
      (data: CollectionPage) => {
        console.log(data);
        this.collectionPage = data;
        this.listGamesvar = data.collections;
        this.totalPages = data.pagination.totalPages;
        // Convertir los datos de imagen en formato Uint8Array a base64 en el componente
        this.collectionPage.collections.forEach(game => {
          game.image = this.getCoverImageData(game.image);
          console.log(game.id,game.game_id)
        });
      }
    );
    }
    
  }

  deleteFromCollection(theId: number) {
    const keyword: string = this.route.snapshot.paramMap.get("keyword");
    console.log(keyword)
    if (keyword == "played") {
      this.service.deleteGamePlayed(theId,this.username).subscribe();
    }

    if (keyword == "playing") {

      this.service.deleteGamePlaying(theId,this.username).subscribe();
      this.router.navigateByUrl('/category/playing');
    }

    if (+this.route.snapshot.paramMap.get('id')!) {
      const theCollectionId : number = +this.route.snapshot.paramMap.get('id')!;
      this.service.deleteGameCollection(theId,this.username).subscribe();
      

    }

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


