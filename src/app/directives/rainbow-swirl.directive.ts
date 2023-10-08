import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRainbowSwirl]'
})
export class RainbowSwirlDirective {
  
  @Input('appRainbowSwirl') set appRainbowSwirl(value:boolean){
    if(value){
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }else{
      this.viewContainerRef.clear()
    }
  }

  constructor(private viewContainerRef : ViewContainerRef, private templateRef: TemplateRef<any>) { }

}
