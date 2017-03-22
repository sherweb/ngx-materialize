import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[mzTooltip], [mz-tooltip]',
})
export class MzTooltipDirective implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() delay: number;
  @Input() html: boolean;
  @Input() position: string;
  @Input() tooltip: string;

  targetElement: JQuery;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
  ) { }

  ngOnInit() {
    this.initElements();
  }

  ngAfterViewInit() {
    this.initTooltip();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.targetElement) {
      this.initTooltip();
    }
  }

  ngOnDestroy() {
    this.renderer.invokeElementMethod(this.targetElement, 'tooltip', ['remove']);
  }

  initElements() {
    this.targetElement = $(this.elementRef.nativeElement);
  }

  initTooltip() {
    const tooltipOptions: Materialize.TooltipOptions = {
      delay: isNaN(this.delay) || this.delay == null ? 350 : this.delay,
      html: this.html || false,
      position: this.position || 'bottom',
      tooltip: this.tooltip,
    };

    this.renderer.invokeElementMethod(this.targetElement, 'tooltip', [tooltipOptions]);
  }
}
