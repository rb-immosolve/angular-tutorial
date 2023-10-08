import { Directive, HostBinding, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appHighlighter]'
})
export class HighlighterDirective {
  @HostBinding('class') class:string = "header"
  @Output('toggle') toggleEmitter = new EventEmitter<boolean>()

  constructor() { }

  @HostListener('mouseover') mouseover(){
    this.class = "rainbow header"
    this.toggleEmitter.emit(true)
  }
  @HostListener('mouseout') mouseout(){
    this.class = "header"
    this.toggleEmitter.emit(false)
  }

}
