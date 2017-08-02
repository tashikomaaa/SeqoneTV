import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[Show]'
})
export class ShowDirective {
  constructor(private el: ElementRef) { }
 
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
 
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.class = 'show';
  }
}