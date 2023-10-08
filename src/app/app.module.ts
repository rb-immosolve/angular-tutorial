import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HighlighterDirective } from './directives/highlighter.directive';
import { RainbowSwirlDirective } from './directives/rainbow-swirl.directive';

@NgModule({
  declarations: [
    AppComponent,
    HighlighterDirective,
    RainbowSwirlDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
