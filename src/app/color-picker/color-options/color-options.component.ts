import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-color-options',
  templateUrl: './color-options.component.html',
  styleUrls: ['./color-options.component.scss']
})
export class ColorOptionsComponent {
  @Output('colorChange') colorChange = new EventEmitter<string>()
  errorList:string = "";
  @ViewChild('redValue') red:ElementRef;
  @ViewChild('greenValue') green:ElementRef;
  @ViewChild('blueValue') blue:ElementRef;

  ngOnInit() {}

  changeColor(newColor:string){
    this.colorChange.emit(newColor);
  }

  setAndChangeColor(){
    let red:number = parseInt(this.red.nativeElement.value);
    let green:number = parseInt(this.green.nativeElement.value);
    let blue:number = parseInt(this.blue.nativeElement.value);

    let errors:string[] = [];
    if(isNaN(red)){
      errors.push('Red value must be an integer')
    }
    if(isNaN(green)){
      errors.push('Green value must be an integer')
    }
    if(isNaN(blue)){
      errors.push('Blue value must be an integer')
    }

    if(red < 0 || red > 255){
      errors.push('Red value must be between 0 and 255')
    }
    if(green < 0 || green > 255){
      errors.push('Green value must be between 0 and 255')
    }
    if(blue < 0 || blue > 255){
      errors.push('Blue value must be between 0 and 255')
    }
    if(errors.length > 0){
      this.errorList = errors.join(' ; ');
      return;
    }else{
      this.errorList = "";
    }
    let redHex:string = red.toString(16).padStart(2,'0');
    let greenHex:string = green.toString(16).padStart(2,'0');
    let blueHex:string = blue.toString(16).padStart(2,'0');
    let finalColor:string = `#${redHex}${greenHex}${blueHex}`
    this.colorChange.emit(finalColor);
  }
}
