import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer,
} from '@angular/core';

import { HandlePropChanges } from '../shared/index';

@Directive({
  selector: 'i[mz-icon], i[mzIcon]',
})
export class MzIconDirective extends HandlePropChanges implements AfterViewInit {
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
      align: (previousValue) => this.handleAlign(previousValue),
      icon: () => this.handleIcon(),
      size: (previousValue) => this.handleSize(previousValue),
    };
  }

  initMaterialize() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'material-icons', true);
  }

  handleAlign(previousValue?: string) {
    if (previousValue) {
      this.renderer.setElementClass(this.elementRef.nativeElement, previousValue, false);
    }
    if (this.align) {
      this.renderer.setElementClass(this.elementRef.nativeElement, this.align, true);
    }
  }

  handleIcon() {
    this.renderer.setElementProperty(this.elementRef.nativeElement, 'innerHTML', this.icon);
  }

  handleSize(previousValue?: string) {
    if (previousValue) {
      this.renderer.setElementClass(this.elementRef.nativeElement, previousValue, false);
    }
    if (this.size) {
      this.renderer.setElementClass(this.elementRef.nativeElement, this.size, true);
    }
  }
}
