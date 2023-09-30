import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-color-presenter',
  templateUrl: './color-presenter.component.html',
  styleUrls: ['./color-presenter.component.scss']
})
export class ColorPresenterComponent {
  @Input('boxColor') boxColor:string = "#000000";

}
