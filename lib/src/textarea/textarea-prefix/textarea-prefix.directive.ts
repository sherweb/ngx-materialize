import { Directive, ElementRef, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: 'i[mzTextareaPrefix], i[mz-textarea-prefix]',
})
export class MzTextareaPrefixDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'prefix', true);
  }
}
