import { Component, OnInit, Input } from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() game: Game;
  @Input() simple ? = false;

  constructor() { }

  ngOnInit(): void {
  }

}
