import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertComponent } from './shared/alert/alert.component';
import { GameService } from './shared/game.service';
import { PlaceholderDirective } from './shared/placeholder.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'comparus-test';

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective
  private closeSub: Subscription

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private gameSefvice: GameService,) {}
  
  ngOnInit(): void {
    this.gameSefvice.gameEvent.subscribe((eventStatus: string) => {
      if( eventStatus === 'finished') {
        this.showGameResults(this.gameSefvice.winner, this.gameSefvice.playerCount, this.gameSefvice.countPC)
      }
    })
  }

  private showGameResults (winner: string, playerScore: number, pcScore: number) {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)

    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear() 

    const componentRef = hostViewContainerRef.createComponent(componentFactory)
    componentRef.instance.winner = winner
    componentRef.instance.playerScore = playerScore
    componentRef.instance.pcScore = pcScore
    this.closeSub = componentRef.instance.close.subscribe(() =>{
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
      this.gameSefvice.winner =null
      this.gameSefvice.playerCount = 0
      this.gameSefvice.countPC = 0
    })
  }

  ngOnDestroy(): void {
      if( this.closeSub) {
        this.closeSub.unsubscribe()
      }
  }
}
