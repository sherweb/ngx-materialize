import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer,
} from '@angular/core';

import { HandlePropChanges } from '../shared/handle-prop-changes';

@Directive({
  selector: 'i[mz-icon-mdi], i[mzIconMdi]',
})
export class MzIconMdiDirective extends HandlePropChanges implements AfterViewInit {
  @Input() align: string;
  @Input() icon: string;
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
      icon: () => this.handleIcon(),
      size: () => this.handleSize(),
    };
  }

  initMaterialize() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'mdi', true);
  }

  handleAlign() {
    this.renderer.setElementClass(this.elementRef.nativeElement, this.align, !!this.align);
  }

  handleIcon() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'mdi-' + this.icon, true);
  }

  handleSize() {
    if (!this.size) {
      this.size = '24px';
    }

    this.renderer.setElementClass(this.elementRef.nativeElement, 'mdi-' + this.size, true);
  }
}
