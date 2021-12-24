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
  private CloseSub!: Subscription

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private gameSefvice: GameService,) {}
  
  ngOnInit(): void {
    this.gameSefvice.gameEvent.subscribe((eventStatus: string) => {
      if( eventStatus === 'finished') {
        console.log("From AppComponent, who is the Winner?: " + this.gameSefvice.winner)
        this.showGameResults(this.gameSefvice.winner)
      }
    })
  }

  private showGameResults (winner: string) {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)

    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear() 

    const componentRef = hostViewContainerRef.createComponent(componentFactory)
    componentRef.instance.winner = winner
    
  }

  ngOnDestroy(): void {
      if( this.CloseSub) {
        this.CloseSub.unsubscribe()
      }
  }
}
