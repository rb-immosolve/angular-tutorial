import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output('tabChange') tabChange = new EventEmitter<string>()

  setActive(tabName:string){
    this.tabChange.emit(tabName)
  }
}
