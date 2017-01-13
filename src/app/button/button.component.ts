import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mz-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class MzButtonComponent {
  @Input() autofocus: boolean;
  @Input() buttonClass: string;
  @Input() disabled: boolean;
  @Input() flat: boolean;
  @Input() float: boolean;
  @Input() id: string;
  @Input() large: boolean;
  @Input() submit: boolean;
  @Input() textClass: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  handleClick(event) {
    if (this.onClick) {
      this.onClick.emit(event);
    }
  }
}
