import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { GameService } from './game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  public serverFilteredGames: Game[];
  public filteredGames: Game[];

  public gameYear: number;
  public gameGame: string;
  public gameGenre: string;
  public gamePublisher: string;
  public gameoriginalPlatforms: string;

  // public gameTitle: string;
  // public gameGenre: string;
  // public gamePlatform: string;
  // public gamePublisher: string;
  // public gameDeveloper: string;
  // public gameReleaseYear: number;
  // public gameContentRating: string;
  // public gameUnitsSold: number;
  // public gameTotalRevenue: number;

  getGameSub: Subscription;

  constructor(private gameService: GameService) { }

  getGamesFromServer(): void {
    this.unsub();
    this.getGameSub = this.gameService.getGames({
      gameGame: this.gameGame,
      gameGenre: this.gameGenre,
      gameYear: this.gameYear,
      gameoriginalPlatforms: this.gameoriginalPlatforms
      // platform: this.gamePlatform,
      // publisher: this.gamePublisher,
      // developer: this.gameDeveloper,
      // releaseYear: this.gameReleaseYear,
      // contentRating: this.gameContentRating,
      // unitsSold: this.gameUnitsSold,
      // totalRevenue: this.gameTotalRevenue
    }).subscribe(returnedGames => {
      this.serverFilteredGames = returnedGames;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateFilter(): void {
    this.filteredGames = this.gameService.filteredGames(
        // eslint-disable-next-line max-len
      this.serverFilteredGames, {gameGame: this.gameGame, gameGenre: this.gameGenre, gameYear: this.gameYear, gameoriginalPlatforms: this.gameoriginalPlatforms});
  }

  ngOnInit(): void {
    this.getGamesFromServer();
  }

  unsub(): void {
    if (this.getGameSub) {
      this.getGameSub.unsubscribe();
    }
  }

}
