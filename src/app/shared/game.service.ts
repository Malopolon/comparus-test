import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum Status {
  Free = "Free",
  Player = "Player",
  pc = "PC"
}

@Injectable({
  providedIn: 'root'
})

export class GameService {
  gameMap: Status[][]
  interval: number

  public drawingCell!: {x: number, y: number}
  winner: any = null
  private winCount = 10
  public playerCount: number
  public countPC: number 

  gameEvent = new Subject<string>()
  roundTime:any

  constructor() {
    this.gameMap = this.generateGameMap(10,10)
    this.winner = null
    this.playerCount = 0
    this.countPC = 0
  }

  generateGameMap(x: number, y: number) {
    const gameMapArr = []

    for (let i = 0; i < x; i++) {
      gameMapArr.push(new Array(y).fill(Status.Free))
    }

    return  gameMapArr
  }


  onStartGame(x: number, y: number) {
    this.gameMap = this.generateGameMap(x, y)
    this.newRound()
  }

  newRound() { 
    this.preparationRoundMap(this.gameMap)
    this.roundTime = setTimeout(() => {
      this.handlePlayerReaction(this.drawingCell.x, this.drawingCell.y, Status.pc)
    }, this.interval)
  }

  preparationRoundMap(gameMap: Status[] []) {

    const max = this.gameMap.length * this.gameMap[0].length 
    const randomNum = Math.floor(Math.random() * max) + 1 

    this.drawingCell = this.drawFieldCell(randomNum, max, this.gameMap)
  }

  drawFieldCell(randomNum: number,max : number, gameMap: Status [][]) {
    let coordinats
    do {
      coordinats = this.randomXY(randomNum-1, gameMap[0].length)
      randomNum++
      if(randomNum >= max) { randomNum = 0}

    } while (gameMap[coordinats.x][coordinats.y] !== Status.Free)

    return coordinats
  } 

  randomXY(number: number, fieldSize: number) {

    const x  = Math.trunc(number / fieldSize)
    const y = number - (fieldSize * x)
    return {x,y}
  }


  handlePlayerReaction(x: number, y: number, status: Status) {
    if(x !== this.drawingCell.x || y !== this.drawingCell.y) {
      return
    }
    this.gameMap[x][y] = status 
    
    clearTimeout(this.roundTime) 

    this.onChangeScore(status)

    this.winner = this.handleWinner(this.playerCount, this.countPC, this.winCount)

    if ( this.winner) {
      this.gameEvent.next('finished')
      return
    }
    this.newRound()
  }

  onChangeScore(status: Status) {
    if(status === Status.Player) { 
      this.playerCount++
    } else {
      this.countPC++
    }
  }

  handleWinner(playerCount: number, countPC: number, winCount: number ) {
    if(playerCount >= winCount) {
      return this.winner = "Player"
    } else if(countPC >= winCount) {
      return this.winner = "PC"
    } else {return null}
  }
}
