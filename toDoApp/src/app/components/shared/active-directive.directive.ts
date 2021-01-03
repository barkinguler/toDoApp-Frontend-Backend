import { Directive, ElementRef, HostListener, Input, Renderer2, RendererFactory2 } from '@angular/core';


@Directive({
  selector: '[appActiveDirective]',
  
})
export class ActiveDirectiveDirective {

static tmpItem:any=null;
private renderer: Renderer2; 
constructor(private rendererFactory: RendererFactory2) { 
  this.renderer = rendererFactory.createRenderer(null, null);
}
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    
    if(ActiveDirectiveDirective.tmpItem===null){
      this.renderer.addClass(event.target,'active');
      ActiveDirectiveDirective.tmpItem=event.target;
    }else{
    this.renderer.removeClass(ActiveDirectiveDirective.tmpItem,'active');
    this.renderer.addClass(event.target,'active');
    ActiveDirectiveDirective.tmpItem=event.target;}
  
  }
}
