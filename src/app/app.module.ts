import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    GameFieldComponent,
    GameSettingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
