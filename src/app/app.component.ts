import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  toggle:boolean = false
  rainbowClass:string = ""
  
  makeItCooler():void {
    this.rainbowClass = (this.rainbowClass=="")?"rainbow":""
  }
}
