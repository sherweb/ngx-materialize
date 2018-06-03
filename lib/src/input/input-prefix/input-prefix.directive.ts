import { Directive, ElementRef, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: 'i[mzInputPrefix], i[mz-input-prefix]',
})
export class MzInputPrefixDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'prefix', true);
  }
}
