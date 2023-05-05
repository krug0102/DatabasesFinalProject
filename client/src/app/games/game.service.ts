import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from './game';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly gameURL: string = environment.apiUrl + 'games';

  constructor(private httpClient: HttpClient ) {
  }

  filteredGames(games: Game[], filters: { gameGame: string; gameGenre: string; gameYear: number; gameoriginalPlatforms: string }): Game[] {

    let filteredGames = games;

    // Filter by Game
    if (filters.gameGame) {
      filters.gameGame = filters.gameGame.toLowerCase();

      filteredGames = filteredGames.filter(game => game.gameGame.toLowerCase().indexOf(filters.gameGame) !== -1);
    }
    if (filters.gameGenre) {
      filters.gameGenre = filters.gameGenre.toLowerCase();
      filteredGames = filteredGames.filter(game => game.gameGenre.toLowerCase().indexOf(filters.gameGenre) !== -1);
    }
    if (filters.gameYear) {
      filteredGames = filteredGames.filter(game => game.gameYear);
    }
    if (filters.gameoriginalPlatforms) {
      filters.gameoriginalPlatforms = filters.gameoriginalPlatforms.toLowerCase();
      filteredGames = filteredGames.filter(game => game.gameoriginalPlatforms.toLowerCase().indexOf(filters.gameoriginalPlatforms) !== -1);
    }

    return filteredGames;
  }

  getGames(filters?: { gameGame?: string; gameGenre?: string; gameYear?: number; gameoriginalPlatforms?: string }): Observable<Game[]> {
    let httpParams: HttpParams = new HttpParams();

    if (filters) {
      if (filters.gameGame) {
        httpParams = httpParams.set('Game', filters.gameGame);
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


