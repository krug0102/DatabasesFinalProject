import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game, GameGenre } from './game';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly gameURL: string = environment.apiUrl + 'games';

  constructor(private httpClient: HttpClient ) {
  }

  filterGames(games: Game[], filters: { gameGame?: string; gameYear?: number; gameoriginalPlatforms?: string; gameGenre?: GameGenre }): Game[] {

    let filteredGames = games;

    // Filter by Game
    if (filters.gameGame) {
      filters.gameGame = filters.gameGame.toLowerCase();

      filteredGames = filteredGames.filter(game => game.gameGame.toLowerCase().indexOf(filters.gameGame) !== -1);
    }
    if (filters.gameYear) {
      filteredGames = filteredGames.filter(game => game.gameYear);
    }
    if (filters.gameoriginalPlatforms) {
      filters.gameoriginalPlatforms = filters.gameoriginalPlatforms.toLowerCase();
      filteredGames = filteredGames.filter(game => game.gameoriginalPlatforms.toLowerCase().indexOf(filters.gameoriginalPlatforms) !== -1);
    }
    if (filters.gameGenre) {
      filteredGames = filteredGames.filter(game => game.gameGenre.indexOf(filters.gameGame) !== -1);
    }
    return filteredGames;
  }

  getGames(filters?: { gameGenre?: GameGenre; store?: string }): Observable<Game[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.gameGenre) {
        httpParams = httpParams.set('gameGenre', filters.gameGenre);
      }
    }
    return this.httpClient.get<Game[]>(this.gameURL, {
      params: httpParams,
    });
  }

  getGameById(id: string): Observable<Game> {
    return this.httpClient.get<Game>(this.gameURL + '/' + id);
  }

}


