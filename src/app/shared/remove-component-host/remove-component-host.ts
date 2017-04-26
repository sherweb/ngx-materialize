import {
  AfterViewInit,
  ElementRef,
  Inject,
} from '@angular/core';

export abstract class MzRemoveComponentHost implements AfterViewInit {

  constructor(
    @Inject(ElementRef) public elementRef: ElementRef,
  ) { }

  ngAfterViewInit() {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;

    // Move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // Remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }
}
