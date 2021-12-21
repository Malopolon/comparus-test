import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

interface GameOptions {
  roundTime: number

}

export class GameService {

  constructor() { }

  onStartNewGame() {

  }


  gnerateGameMap(x: number, y: number) {
    const arr = []

    for (let i = 0; i < x; i++) {
      arr.push(new Array(y))
    }

    return console.log(arr)
  }
}
