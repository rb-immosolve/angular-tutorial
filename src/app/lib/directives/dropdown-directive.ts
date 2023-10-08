import { Directive, ElementRef, HostBinding, HostListener, OnInit, TemplateRef } from "@angular/core";

@Directive({
    selector : '[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') isOpen = false

    @HostListener('document:click', ['$event']) toggleDropdown(event: Event){
        this.isOpen = this._elem.nativeElement.contains(event.target)? !this.isOpen : false
    }

    constructor(private _elem : ElementRef){}
}