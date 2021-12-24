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
  gameMap!: Status[][]
  interval!: number

  public drawingCell!: {x: number, y: number}
  winner: any = null
  private winCount = 10
  public playerCount!: number
  public countPC!: number 

  gameEvent = new Subject<string>()
  roundTime:any

  constructor() {
    this.gameMap = this.generateGameMap(10,10)
    this.winner = null
    this.playerCount = 0
    this.countPC = 0
  }

  generateGameMap(x: number, y: number) {  //генерируем массив с клетками поля 10 на 10
    const gameMapArr = []

    for (let i = 0; i < x; i++) {
      gameMapArr.push(new Array(y).fill(Status.Free))
    }

    return  gameMapArr
  }


  onStartGame(x: number, y: number) { // запуск игры
    this.gameMap = this.generateGameMap(x, y)
    this.newRound()
  }

  newRound() { //начинаем новый раун ( выбираем случайную клетку)
    this.preparationRoundMap(this.gameMap)

    this.gameEvent.next("new round")
    this.roundTime = setTimeout(() => {
      this.handlePlayerReaction(this.drawingCell.x, this.drawingCell.y, Status.pc)
    }, this.interval)
  }

  preparationRoundMap(gameMap: Status[] []) { //( выбираем случайную клетку)

    const max = this.gameMap.length * this.gameMap[0].length //выборка ходов, в данном случае это будет 100
    const randomNum = Math.floor(Math.random() * max) + 1 // выбираем случайный ход 

    this.drawingCell = this.drawFieldCell(randomNum, max, this.gameMap) // выбирае  случайную клетку для этого раунда
  }

  drawFieldCell(randomNum: number,max : number, gameMap: Status [][]) {  // разрисовываем клеточку
    let coordinats
    do {
      coordinats = this.randomXY(randomNum-1, gameMap[0].length)
      randomNum++
      if(randomNum >= max) { randomNum = 0}

    } while (gameMap[coordinats.x][coordinats.y] !== Status.Free) //проверка, что бы не использовались уже разигранные клетки

    return coordinats
  } 

  randomXY(number: number, fieldSize: number) { // случайные координаты для активной клетки

    const x  = Math.trunc(number / fieldSize)
    const y = number - (fieldSize * x)     // получаем случайные координаты
    return {x,y}
  }


  handlePlayerReaction(x: number, y: number, status: Status) { //статус - кто нажал или нет на клетку
    console.log("handle Player Reaction: "+ status)
    if(x !== this.drawingCell.x || y !== this.drawingCell.y) {
      return
    }

    clearTimeout(this.roundTime) 

    this.gameMap[x][y] = status 

    this.onChangeScore(status)

    this.winner = this.handleWinner(this.playerCount, this.countPC, this.winCount)

    if ( this.winner) {
      this.gameEvent.next('finished')
      return
    }
    this.newRound()
  }

  onChangeScore(status: Status) { // изменение в счете игры
    if(status === Status.Player) { 
      this.playerCount++
      console.log('Player count ' + this.playerCount)
    } else {
      this.countPC++
    }
  }

  handleWinner(playerCount: number, countPC: number, winCount: number ) {
    if(playerCount >= winCount) {
      console.log('Winner: ' + winCount)
      return this.winner = "Player"
    } else if(countPC === winCount) {
      return this.winner = "PC"
    } else {return null;}
  }
}
