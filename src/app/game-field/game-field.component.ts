import { Component, OnInit } from '@angular/core';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.gnerateGameMap(10,10)
  }

}
