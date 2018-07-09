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
  @HostBinding('class.horizontal') @Input() horizontal: boolean;
  @HostBinding('class.hoverable') @Input() hoverable: boolean;

  @ViewChild('cardAction') cardAction: ElementRef;
  @ViewChild('cardImage') cardImage: ElementRef;
  @ViewChild('cardTitle') cardTitle: ElementRef;

  hasCardAction = true;
  hasCardImage = true;
  hasCardImageTitle = true;
  hasCardTitle = true;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.hasCardTitle = this.hasTitleTagAndNotEmpty();
    this.hasCardAction = this.hasActionTagAndNotEmpty();
    this.hasCardImage = this.hasImageTagAndNotEmpty();
    this.hasCardImageTitle = this.hasImageTitleTagAndNotEmpty();
    this.changeDetectorRef.detectChanges();
  }

  private hasActionTagAndNotEmpty(): boolean {
    const cardActionElement = this.cardAction.nativeElement.querySelector('mz-card-action');
    return this.isElementDisplayed(cardActionElement);
  }

  private hasImageTagAndNotEmpty(): boolean {
    const cardImagelement = this.cardImage.nativeElement.querySelector('mz-card-image');
    return this.isElementDisplayed(cardImagelement);
  }

  private hasImageTitleTagAndNotEmpty(): boolean {

    const cardImageTitleElement = this.cardImage.nativeElement.querySelector('mz-card-image-title');
    return this.isElementDisplayed(cardImageTitleElement);
  }

  private hasTitleTagAndNotEmpty(): boolean {
    const cardTitleElement = this.cardTitle ? this.cardTitle.nativeElement.querySelector('mz-card-title') : null;
    return this.isElementDisplayed(cardTitleElement);
  }

  private isElementDisplayed(element: HTMLElement): boolean {
    return element && element.innerHTML.trim() !== '';
  }
}

// Declare the tags to avoid error: '<mz-card-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector

@Directive({ selector: 'mz-card-image' }) export class MzCardImageDirective { }
@Directive({ selector: 'mz-card-image-title' }) export class MzCardImageTitleDirective { }
@Directive({ selector: 'mz-card-title' }) export class MzCardTitleDirective { }
@Directive({ selector: 'mz-card-content' }) export class MzCardContentDirective { }
@Directive({ selector: 'mz-card-action' }) export class MzCardActionDirective { }

