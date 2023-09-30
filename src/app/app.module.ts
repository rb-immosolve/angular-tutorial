import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorOptionsComponent } from './color-picker/color-options/color-options.component';
import { ColorPresenterComponent } from './color-picker/color-presenter/color-presenter.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorPickerComponent,
    ColorOptionsComponent,
    ColorPresenterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
