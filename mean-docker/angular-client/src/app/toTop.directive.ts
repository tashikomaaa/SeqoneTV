import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ToTop]'
})
export class ToTopDirective {
  constructor(private el: ElementRef) { }
 
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
 
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  @HostListener('click', ['$event'])
    onClick(ev: Event){
        window.scrollTo(0, 0);
    }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}