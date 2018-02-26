import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'mz-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class MzChipComponent {
  @HostBinding('class.chip') chipClass = true;

  @Input() close = false;
  @Output() delete = new EventEmitter<string>();

  get chipElement(): HTMLElement {
    return this.elementRef.nativeElement as HTMLElement;
  }

  constructor(
    private elementRef: ElementRef,
  ) { }

  onDelete() {
    let value = '';
    for (let i = 0; i < this.chipElement.childNodes.length; i++) {
      if (this.chipElement.childNodes.item(i).nodeType === Node.TEXT_NODE) {
        value += this.chipElement.childNodes.item(i).nodeValue;
      }
    }
    this.delete.emit(value.trim());
  }
}
