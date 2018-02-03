import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'mz-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class MzChipComponent {
  @HostBinding('class.chip') true;

  @Input() close = false;
  @Output() delete = new EventEmitter<string>();

  get chipElement(): HTMLElement {
    return this.elementRef.nativeElement as HTMLElement;
  }

  constructor(
    private elementRef: ElementRef,
  ) { }

  onDelete() {
    this.delete.emit(this.chipElement.innerText.trim());
  }
}
