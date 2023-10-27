import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ListSorterComponent } from './list-sorter/list-sorter.component';
import { SorterPipe } from './list-sorter/sorter.pipe';
import { ReversePipe } from './list-sorter/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListSorterComponent,
    SorterPipe,
    ReversePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
