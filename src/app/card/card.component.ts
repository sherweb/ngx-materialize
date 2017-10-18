import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'mz-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.scss' ],
})
export class MzCardComponent implements AfterViewInit {
  @HostBinding('class.card') true;
  @HostBinding('class.hoverable') @Input() hoverable: boolean;

  @ViewChild('cardTitle') cardTitle: ElementRef;
  @ViewChild('cardAction') cardAction: ElementRef;

  hasCardAction = true;
  hasCardTitle = true;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.hasCardTitle = this.hasTitleTagAndNotEmpty();
    this.hasCardAction = this.hasActionTagAndNotEmpty();
    this.changeDetectorRef.detectChanges();
  }

  private hasActionTagAndNotEmpty(): boolean {
    const cardActionElement = this.cardAction.nativeElement.querySelector('mz-card-action');
    return this.isElementDisplayed(cardActionElement);
  }

  private hasTitleTagAndNotEmpty(): boolean {
    const cardTitleElement = this.cardTitle.nativeElement.querySelector('mz-card-title');
    return this.isElementDisplayed(cardTitleElement);
  }

  private isElementDisplayed(element: HTMLElement): boolean {
    return element && element.innerHTML.trim() !== '';
  }
}

// Declare the tags to avoid error: '<mz-card-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector
@Directive({ selector: 'mz-card-title' }) export class MzCardTitleDirective { }
@Directive({ selector: 'mz-card-content' }) export class MzCardContentDirective { }
@Directive({ selector: 'mz-card-action' }) export class MzCardActionDirective { }
