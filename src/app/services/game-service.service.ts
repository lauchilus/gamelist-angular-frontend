import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Game } from '../common/game';
import { ListGames } from '../common/list-games';
import { Playing } from '../common/playing';
import { played } from '../common/played';
import { Collections } from '../common/collections';
import { AddCollections } from '../common/addcollections';
import { AddPlayed } from '../common/addPlayed';
import { CollectionPage } from '../common/collection-page';
import { PostPlayed } from '../common/post-played';

@Injectable({
  providedIn: 'root'
})
export class GameService {
 
  private baseUrl = "http://localhost:8080/gamelist"

  constructor(private httpClient: HttpClient) { }

  getGame(theGame: string): Observable<Game>{
    const searchUrl = `${this.baseUrl}/${theGame}`;
    console.log("LA PUTA MADRE " + theGame)
    return this.httpClient.get<Game>(searchUrl);
  }

  getGameById(id: number): Observable<Game>{
    const searchUrl = `${this.baseUrl}/details/${id}`;
    return this.httpClient.get<Game>(searchUrl);
  }

  getGamesSearchList(theGame: string): Observable<Game[]>{
    const searchUrl = `${this.baseUrl}/searchByName/${theGame}`;
    return this.httpClient.get<Game[]>(searchUrl);
  }


  getGamesList(): Observable<ListGames[]>  {
    const searchUrl = `${this.baseUrl}/listGames`;
    return this.httpClient.get<ListGames[]>(searchUrl);
    
  }

  getCollectionById(collectionId: number,thePage:number): Observable<CollectionPage> {
    const collectionUrl = `${this.baseUrl}/${collectionId}/games?page=${thePage}`; 
    return this.httpClient.get<CollectionPage>(collectionUrl);
  }

  getGamesCollection(keyword: string, username: string,thePage:number) : Observable<any>  {
    const searchUrl = `${this.baseUrl}/${username}`;
    switch(keyword){
      case 'collections':
        const searchCollections = `${searchUrl}/collections?page=${thePage}`
        return  this.httpClient.get<CollectionPage>(searchCollections);
        break;
      case 'played':
        const searchPlayed = `${searchUrl}/played?page=${thePage}`
        return this.httpClient.get<played[]>(searchPlayed);
        break;
        case 'playing':
        const searchPlaying = `${searchUrl}/playing?page=${thePage}`
        return this.httpClient.get<Playing[]>(searchPlaying);
        break;
        default:
          console.log("no category for that name or user");
          return null;
      }

  }

  postCollection(theCollection: AddCollections) {
    const searchUrl = `${this.baseUrl}/collection`;
    return this.httpClient.post<AddCollections>(searchUrl, theCollection)
      .pipe(
        catchError((error: any) => {
          console.error('Error en el servicio:', error);
          throw error;
        })
      );
  }

  postPlaying(theGame: AddPlayed,theUsername:string) {
    const searchUrl = `${this.baseUrl}/${theUsername}/playing`;
    return this.httpClient.post<AddPlayed>(searchUrl, theGame)
      .pipe(
        catchError((error: any) => {
          console.error('Error en el servicio:', error);
          throw error;
        })
      );
  }


  postPlayed(theGame: PostPlayed,theUsername:string) {
    const searchUrl = `${this.baseUrl}/${theUsername}/played`;
    return this.httpClient.post<PostPlayed>(searchUrl, theGame)
      .pipe(
        catchError((error: any) => {
          console.error('Error en el servicio:', error);
          throw error;
        })
      );
  }

  postGameToCollection(theGame: AddPlayed,theCollection: number) {
    const searchUrl = `${this.baseUrl}/${theCollection}/game`;
    return this.httpClient.post<AddPlayed>(searchUrl, theGame)
      .pipe(
        catchError((error: any) => {
          console.error('Error en el servicio:', error);
          throw error;
        })
      );
  }
 
  deleteGamePlayed(theId: number,theUsername:string) {
    const searchUrl=`${this.baseUrl}/${theUsername}/played/${theId}`;
    return this.httpClient.delete<number>(searchUrl)
    .pipe(
      catchError((error: any) => {
        console.error('Error en el servicio:', error);
        throw error;
      })
    );
  }

  deleteGamePlaying(theId: number,theUsername:string) {
    const searchUrl=`${this.baseUrl}/${theUsername}/playing/${theId}`;
    return this.httpClient.delete<number>(searchUrl)
    .pipe(
      catchError((error: any) => {
        console.error('Error en el servicio:', error);
        throw error;
      })
    );
  }

  deleteGameCollection(theId: number,theUsername:string) {
    const searchUrl=`${this.baseUrl}/${theUsername}/collection/${theId}`;
    return this.httpClient.delete<number>(searchUrl)
    .pipe(
      catchError((error: any) => {
        console.error('Error en el servicio:', error);
        throw error;
      })
    );
  }
  

}

interface GetResponseGame{
  _embedded:{
    gamesList: ListGames[];
  }
}
