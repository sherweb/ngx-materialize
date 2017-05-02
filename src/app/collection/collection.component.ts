import { Component, ElementRef, OnInit, Renderer } from '@angular/core';

@Component({
  selector: 'mz-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class MzCollectionComponent implements OnInit {
  collectionElement: JQuery;
  collectionHeaderElement: JQuery;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
  ) { }

  ngOnInit() {
    this.initElements();
    this.initCollectionHeader();
  }

  initElements() {
    this.collectionElement = $(this.elementRef.nativeElement).find('.collection');
    this.collectionHeaderElement = $(this.elementRef.nativeElement).find('.collection-header');
  }

  initCollectionHeader() {
    this.renderer.setElementClass(this.collectionElement[0], 'with-header', this.collectionHeaderElement.length > 0);
  }
}
