import { Component, ElementRef, Input, OnInit, Renderer, ViewChild } from '@angular/core';

@Component({
  selector: 'mz-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class MzBadgeComponent implements OnInit {
  @Input() caption: string;
  @Input() badgeClass: string;
  @Input() new: boolean;
  @Input() value: number;

  @ViewChild('badge') badge: ElementRef;
  constructor (public renderer: Renderer) { }

  ngOnInit() {
    this.handleCaption();
  }

  handleCaption() {
    if (this.caption) {
      this.renderer.setElementAttribute(this.badge.nativeElement, 'data-badge-caption', this.caption);
    }
  }
}
