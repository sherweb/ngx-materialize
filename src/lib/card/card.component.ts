import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  Input,
  ViewChild } from '@angular/core';

@Component({
  selector: 'mz-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.scss' ],
})
export class MzCardComponent implements AfterViewInit {
  @Input() backgroundClass: string;
  @Input() hoverable: boolean;
  @Input() textClass: string;

  @ViewChild('cardActionWrapper') cardActionWrapper: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    this.initCardAction();
  }

  private initCardAction() {
    const cardActionElement = $(this.cardActionWrapper.nativeElement).find('mz-card-action');

    // hide action wrapper when mz-card-action element is not present
    // or when mz-card-action does not contain any html (text or elements)
    if (cardActionElement.length === 0 || cardActionElement[0].innerHTML.trim() === '') {
      this.cardActionWrapper.nativeElement.style.display = 'none';
    }
  }
}


// Declare the tags to avoid error: '<mz-card-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector
@Directive({ selector: 'mz-card-title' }) export class MzCardTitleDirective { }
@Directive({ selector: 'mz-card-content' }) export class MzCardContentDirective { }
@Directive({ selector: 'mz-card-action' }) export class MzCardActionDirective { }
