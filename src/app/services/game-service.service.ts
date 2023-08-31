import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Game } from '../common/game';
import { ListGames } from '../common/list-games';
import { Playing } from '../common/playing';

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

  getGamesCollection(keyword: string, username: string) : Observable<Playing[]>  {
    const searchUrl = `${this.baseUrl}/${username}`;
    switch(keyword){
      case 'collections':
        const searchCollections = `${searchUrl}/collections`
        return this.httpClient.get<Playing[]>(searchCollections);
        break;
      case 'played':
        const searchPlayed = `${searchUrl}/played`
        return this.httpClient.get<Playing[]>(searchPlayed);
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
