import {
  AfterViewInit,
  ElementRef,
  Inject,
  OnDestroy,
} from '@angular/core';

export abstract class MzRemoveComponentHost implements AfterViewInit, OnDestroy {

  private childrenElement: HTMLElement[] = [];
  private parentElement: HTMLElement;

  constructor(
    @Inject(ElementRef) public elementRef: ElementRef,
  ) { }

  ngAfterViewInit() {
    const hostElement = this.elementRef.nativeElement;
    this.parentElement = hostElement.parentElement;

    // move child out of the host element
    while (hostElement.firstChild) {
      this.childrenElement.push(this.parentElement.insertBefore(hostElement.firstChild, hostElement));
    }
  }

  ngOnDestroy() {
    // remove moved out element
    this.childrenElement.forEach(childElement => this.parentElement.removeChild(childElement));
  }
}
