import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from './game';
import { GameService } from './game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-profile',
  templateUrl: './game-profile.component.html',
  styleUrls: ['./game-profile.component.scss']
})
export class GameProfileComponent implements OnInit, OnDestroy {

  game: Game;
  id: string;
  getGameSub: Subscription;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    // We subscribe to the parameter map here so we'll be notified whenever
    // that changes (i.e., when the URL changes) so this component will update
    // to display the newly requested product.
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getGameSub) {
        this.getGameSub.unsubscribe();
      }
      this.getGameSub = this.gameService.getGameById(this.id).subscribe(game => this.game = game);
    });
  }

  ngOnDestroy(): void {
    if (this.getGameSub) {
      this.getGameSub.unsubscribe();
    }
  }

}