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

  filteredGames(games: Game[], filters: { title: string, genre: string }): Game[] {

    let filteredGames = games;

    // Filter by title
    if (filters.title) {
      filters.title = filters.title.toLowerCase();

      filteredGames = filteredGames.filter(game => game.title.toLowerCase().indexOf(filters.title) !== -1);
    }

    return filteredGames;
  }

  getGames(filters?: { title?: string, genre?: string }): Observable<Game[]> {
    let httpParams: HttpParams = new HttpParams();

    if (filters) {
      if (filters.title) {
        httpParams = httpParams.set('title', filters.title);
      }
    }

    return this.httpClient.get<Game[]>(this.gameURL, {
      params: httpParams,
    });
  }

}


