import { Component } from '@angular/core';

@Component({
  selector: 'app-logic',
  templateUrl: './logic.component.html',
  styleUrls: ['./logic.component.css']
})
export class LogicComponent {
  condition:boolean = true;
  colorCondition:boolean = true;
  server:string = ''
  servers:string[] = []

  constructor(){

  }

  toggleColor():void {
    this.colorCondition = !this.colorCondition
  }

  addServer():void {
    this.servers.push(this.server)
    this.server=''
  }
}
