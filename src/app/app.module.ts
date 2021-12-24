import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { FieldCellComponent } from './game-field/field-cell/field-cell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GameFieldComponent,
    GameSettingsComponent,
    FieldCellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
