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

  x!:number
  y!:number

  drawingCell!: {x: number, y: number}
  winner: any = null
  winCount = 10
  playerCount!: number
  countPC!: number 

  gameEvent = new Subject<string>()
  constructor() {
    this.gameMap = this.generateGameMap(10,10)
    this.winner = null
    this.playerCount = 0
  }

  generateGameMap(x: number, y: number) {  //генерируем массив с клетками поля 10 на 10
    const gameMapArr = []

    for (let i = 0; i < x; i++) {
      gameMapArr.push(new Array(y).fill(Status.Free))
    }

    return  gameMapArr
  }

  startGame() {
    this.onStartGame(10,10)
  }
  onStartGame(x: number, y: number) { // запуск игры
    this.gameMap = this.generateGameMap(x, y)
    this.newRound()

    this.gameEvent.next('Start game') // начало события игры
    
    setTimeout(() => {  //время на действия игрока
      this.handlePlayerReaction(this.drawingCell.x, this.drawingCell.y, Status.pc)
    },this.interval)
  }

  newRound() { //начинаем новый раун ( выбираем случайную клетку)
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

    } while (gameMap[coordinats.x][coordinats.y] !== Status.Free) //проверка, что бы не использовались уже заигранные клетки

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

    clearTimeout(this.interval) 

    this.gameMap[x][y] = status 

    this.onChangeScore(status)

    this.winner = this.handleWinner(this.playerCount, this.countPC, this.winCount)

    if ( this.winner) {
      this.gameEvent.next('finished')
      return
    }
    this.startGame()
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
    if(playerCount === winCount) {
      console.log('Winner: ' + winCount)
      return this.winner = "Player"
    }

    if(countPC === winCount) {
      return this.winner = "PC"
    }

    return
  }

}
