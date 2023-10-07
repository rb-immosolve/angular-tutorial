import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlighter]'
})
export class HighlighterDirective implements OnInit {

  constructor(private elem : ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elem.nativeElement, 'backgroundColor', 'orange');
    this.renderer.setStyle(this.elem.nativeElement, 'color', 'white');
  }
}
