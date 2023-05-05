import { Component, OnInit } from '@angular/core';
import { Game, GameGenre } from './game';
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
  public gameGenre: GameGenre;
  public gamePublisher: string;
  public gameoriginalPlatforms: string;

  public activeFilters: boolean;

  public genresList: GameGenre[] = [
    'Strategy',
    'Action', 
    'Role-playing',
    'Action Role-playing',
    'Action-adventure',
    'Turn-based strategy',
    'Adventure',
    'Platform',
    'Rhythm',
    'Real-time strategy',
    'Sandbox',
    'Puzzle-platformer',
    'Stealth',
    'First-person shooter',
    'Tactical role-playing',
    'Puzzle',
    'Digital collectible card',
    'Sports',
    'Simulation',
    'Battle royal',
    'Third-person shooter',
    'MOBA',
    'Tower defense',
    'Top-down shooter',
    'Shoot \'em up',
    'Vehicle simulation',
    'Maze',
    'Business simulation',
    'Space flight simulator',
    'Block breaker',
    'Racing',
    'Run and gun',
    'Beat \'em up',
    'God game',
    'City-building',
    'Fighting',
    'Survival horror',
    'Kart racing',
    'Real-time tactics',
    'Artillery',
    'MMORPG',
    'Life simulation'
  ];

  getGameSub: Subscription;

  public genreNameMap = new Map<GameGenre, Game[]>();

  constructor(private gameService: GameService) { }

  getGamesFromServer(): void {
    this.unsub();
    this.getGameSub = this.gameService.getGames({
      gameGenre: this.gameGenre,
      // platform: this.gamePlatform,
      // publisher: this.gamePublisher,
      // developer: this.gameDeveloper,
      // releaseYear: this.gameReleaseYear,
      // contentRating: this.gameContentRating,
      // unitsSold: this.gameUnitsSold,
      // totalRevenue: this.gameTotalRevenue
    }).subscribe(returnedGames => {
      this.serverFilteredGames = returnedGames;
      this.initializeGenreMap();
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  initializeGenreMap() {
    for (let givenGenre of this.genresList) {
      this.genreNameMap.set(givenGenre,
        this.gameService.filterGames(this.serverFilteredGames, { gameGenre: givenGenre }));
    }
    console.log(this.genreNameMap)
  }

  public updateFilter(): void {
    this.filteredGames = this.gameService.filterGames(
        // eslint-disable-next-line max-len
      this.serverFilteredGames, {gameGame: this.gameGame, gameYear: this.gameYear, gameoriginalPlatforms: this.gameoriginalPlatforms});
      if (this.gameGame || this.gameGenre || this.gameoriginalPlatforms || this.gameYear) {
        this.activeFilters = true;
      }
      else {
        this.activeFilters = false;
      }
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
