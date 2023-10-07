import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LogicComponent } from './logic/logic.component';
import { Assignment3Component } from './assignment3/assignment3.component';
import { HighlighterDirective } from './lib/directives/highlighter.directive';

@NgModule({
  declarations: [
    AppComponent,
    LogicComponent,
    Assignment3Component,
    HighlighterDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
