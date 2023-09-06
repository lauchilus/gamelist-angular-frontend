import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Game } from '../common/game';
import { ListGames } from '../common/list-games';
import { Playing } from '../common/playing';
import { played } from '../common/played';
import { Collections } from '../common/collections';

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

  


  getGamesList(): Observable<ListGames[]>  {
    const searchUrl = `${this.baseUrl}/listGames`;
    return this.httpClient.get<ListGames[]>(searchUrl);
    
  }

  getCollectionById(collectionId: string): Observable<ListGames[]> {
    const collectionUrl = `${this.baseUrl}/${collectionId}/games`; 
    return this.httpClient.get<ListGames[]>(collectionUrl);
  }

  getGamesCollection(keyword: string, username: string) : Observable<any[]>  {
    const searchUrl = `${this.baseUrl}/${username}`;
    switch(keyword){
      case 'collections':
        const searchCollections = `${searchUrl}/collections`
        return this.httpClient.get<Collections[]>(searchCollections);
        break;
      case 'played':
        const searchPlayed = `${searchUrl}/played`
        return this.httpClient.get<played[]>(searchPlayed);
        break;
        case 'playing':
        const searchPlaying = `${searchUrl}/playing`
        return this.httpClient.get<Playing[]>(searchPlaying);
        break;
        default:
          console.log("no category for that name or user");
          return null;
      }

  }

}

interface GetResponseGame{
  _embedded:{
    gamesList: ListGames[];
  }
}
