import {
    Directive,
    ElementRef,
    Input,
    OnInit,
    Renderer,
} from '@angular/core';

import { HandlePropChanges } from '../shared/index';

@Directive({
  selector: `
    a[mz-button],
    a[mzButton],
    button[mz-button],
    button[mzButton]`,
})
export class MzButtonDirective extends HandlePropChanges implements OnInit {
  @Input() disabled: boolean;
  @Input() flat: boolean;
  @Input() float: boolean;
  @Input() large: boolean;
  @Input() noWaves: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    super();
  }

  ngOnInit() {
    this.initHandlers();
    this.initMaterialize();
    super.executePropHandlers();
  }

  initHandlers() {
    this.handlers = {
      disabled: () => this.handleDisabled(),
      flat: () => this.handleFlat(),
      float: () => this.handleFloat(),
      large: () => this.handleLarge(),
      noWaves: () => this.handleNoWaves(),
    };
  }

  initMaterialize() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'btn', true);
  }

  handleDisabled() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'disabled', this.disabled);
  }

  handleFlat() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'btn', !this.flat);
    this.renderer.setElementClass(this.elementRef.nativeElement, 'btn-flat', this.flat);
  }

  handleFloat() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'btn-floating', this.float);
  }

  handleLarge() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'btn-large', this.large);
  }

  handleNoWaves() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'waves-effect', !this.noWaves);

    if (!this.flat) {
      this.renderer.setElementClass(this.elementRef.nativeElement, 'waves-light', !this.noWaves);
    }
  }
}
