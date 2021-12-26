import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit{
  alertTitle!: string
  alertMessage!: string
  
  @Input() playerScore: number
  @Input() pcScore: number
  @Input() winner: string
  @Output() close = new EventEmitter<void>()
  constructor() { }
    ngOnInit(): void {
        console.log(this.pcScore)
        switch (this.winner) {
          case 'Player':
            this.alertTitle = 'Congratulations',
            this.alertMessage = 'You were on top as always'
          break

          case 'PC': 
            this.alertTitle = 'Sorry, but you lost',
            this.alertMessage = 'Better luck next time'
        }
    }
    onClose() {
      this.close.emit()
    }

}
