import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent {
  @Output('eventFired') eventFired = new EventEmitter<number>()
  eventCounter:number = 0
  activeInterval:any

  startEvents(){
    this.activeInterval = setInterval(() => {this.eventFired.emit(this.eventCounter);this.eventCounter++;}, 1000);
  }

  stopEvents(){
    clearInterval(this.activeInterval)
  }
}
