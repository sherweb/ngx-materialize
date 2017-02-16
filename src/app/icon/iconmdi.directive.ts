import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer,
} from '@angular/core';

import { HandlePropChanges } from '../shared/handle-prop-changes';

@Directive({
  selector: '[mz-icon-mdi], [mzIconMdi]',

})
export class MzIconMdiDirective extends HandlePropChanges implements AfterViewInit {
  @Input() align: string;
  @Input() flip: string;
  @Input() icon: string;
  @Input() rotate: string;
  @Input() size: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    super();
  }

  ngAfterViewInit() {
    this.initHandlers();
    this.initMaterialize();
    super.executePropHandlers();
  }

  initHandlers() {
    this.handlers = {
      align: () => this.handleAlign(),
      flip: () => this.handleFlip(),
      icon: () => this.handleIcon(),
      rotate: () => this.handleRotate(),
      size: () => this.handleSize(),
    };
  }

  initMaterialize() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'mdi', true);
  }

  handleAlign() {
    this.renderer.setElementClass(this.elementRef.nativeElement, this.align, !!this.align);
  }

  handleFlip() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'mdi-flip-' + this.flip, !!this.flip);
  }

  handleIcon() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'mdi-' + this.icon, true);
  }

  handleRotate() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'mdi-rotate-' + this.rotate, !!this.rotate);
  }

  handleSize() {
    if (!this.size) {
      this.size = '24px';
    }

    this.renderer.setElementClass(this.elementRef.nativeElement, 'mdi-' + this.size, true);
  }
}
