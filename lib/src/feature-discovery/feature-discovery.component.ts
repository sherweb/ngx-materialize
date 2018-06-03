import { AfterViewInit, Component, ElementRef, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'mz-feature-discovery',
  templateUrl: './feature-discovery.component.html',
  styleUrls: ['./feature-discovery.component.scss'],
})
export class MzFeatureDiscoveryComponent implements AfterViewInit {
  @HostBinding('class.tap-target')
  targetClass = true;

  @HostBinding('attr.data-activates')
  @Input()
  targetId: string;

  private target: JQuery<Element>;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngAfterViewInit() {
    this.target = $(this.elementRef.nativeElement);
  }

  close() {
    this.target.tapTarget('close');
  }

  open() {
    this.target.tapTarget('open');
  }
}
