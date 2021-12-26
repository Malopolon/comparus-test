import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Status } from '../shared/game.service';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit, OnDestroy {
  gameField!: any[][]
  status = Status

  constructor(public gameService: GameService) {}
  
  ngOnInit() {
  }
  
  onClick(x: number, y: number) {
    this.gameService.handlePlayerReaction(x, y, Status.Player)
  }

  ngOnDestroy() {
    this.gameService.gameEvent.unsubscribe()
  }
}
