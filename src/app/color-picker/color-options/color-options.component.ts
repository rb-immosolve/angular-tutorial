import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-color-options',
  templateUrl: './color-options.component.html',
  styleUrls: ['./color-options.component.scss']
})
export class ColorOptionsComponent {
  @Output('colorChange') colorChange = new EventEmitter<string>()
  errorList:string = "";

  ngOnInit() {}

  changeColor(newColor:string){
    this.colorChange.emit(newColor);
  }

  setAndChangeColor(red:string, green:string, blue:string){
    let errors:string[] = [];
    if(isNaN(parseInt(red)) || parseInt(red).toString() != red){
      errors.push('Red value must be an integer')
    }
    if(isNaN(parseInt(green)) || parseInt(green).toString() != green){
      errors.push('Green value must be an integer')
    }
    if(isNaN(parseInt(blue)) || parseInt(blue).toString() != blue){
      errors.push('Blue value must be an integer')
    }

    if(parseInt(red) < 0 || parseInt(red) > 255){
      errors.push('Red value must be between 0 and 255')
    }
    if(parseInt(green) < 0 || parseInt(green) > 255){
      errors.push('Green value must be between 0 and 255')
    }
    if(parseInt(blue) < 0 || parseInt(blue) > 255){
      errors.push('Blue value must be between 0 and 255')
    }
    if(errors.length > 0){
      this.errorList = errors.join(' ; ');
      return;
    }else{
      this.errorList = "";
    }
    let redHex:string = parseInt(red).toString(16).padStart(2,'0');
    let greenHex:string = parseInt(green).toString(16).padStart(2,'0');
    let blueHex:string = parseInt(blue).toString(16).padStart(2,'0');
    let finalColor:string = `#${redHex}${greenHex}${blueHex}`
    this.colorChange.emit(finalColor);

  }
}
