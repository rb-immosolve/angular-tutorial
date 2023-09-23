import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.css']
})
export class Assignment3Component {
  paragraphDisplay:boolean = false;
  logs:string[] = []

  toggleAndLog(){
    this.paragraphDisplay=!this.paragraphDisplay
    let now:Date = new Date()
    this.logs.push(`Button clicked at : ${this.timestamp(now)}`)
  }

  timestamp(now:Date) {
    let timestamp:string = ''
    timestamp += `${now.getDate().toString().padStart(2,'0')}/`
    timestamp += `${now.getMonth().toString().padStart(2,'0')}/`
    timestamp += `${now.getFullYear().toString().padStart(4,'0')} `
    timestamp += `${now.getHours().toString().padStart(2,'0')}:`
    timestamp += `${now.getMinutes().toString().padStart(2,'0')}:`
    timestamp += `${now.getSeconds().toString().padStart(2,'0')}.`
    timestamp += `${now.getMilliseconds().toString().padStart(3,'0')}`
    return timestamp;
  }
}
