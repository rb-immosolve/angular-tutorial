import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appHighlighter]'
})
export class HighlighterDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor : string = 'transparent';
  @HostBinding('style.color') color : string = 'black';

  @Input('appHighlighter') highlightColor : string = 'orange';

  // constructor(private elem : ElementRef, private renderer: Renderer2) { }
  constructor() {}

  ngOnInit() {

  }

  @HostListener('mouseover') mouseOver(event : Event){
    this.backgroundColor = this.highlightColor;
    this.color = 'white';
  }

  @HostListener('mouseout') mouseOut(event : Event){
    this.backgroundColor = 'transparent';
    this.color = 'black';
  }
}
