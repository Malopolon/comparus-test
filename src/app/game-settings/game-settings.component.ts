import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit {
  settingsFrom!: FormGroup
  constructor(public gameService: GameService) { }

  

  private initForm() {
    let interval = null
    this.settingsFrom = new FormGroup({
      "interval": new FormControl(interval, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  }
  onSubmit() {
    this.gameService.interval = this.settingsFrom.value['interval']
    this.gameService.onStartGame(10,10)
    this.settingsFrom.reset()
  }

  ngOnInit(){
    this.initForm()
  }
}
