import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-timepicker-container',
  templateUrl: './timepicker-container.component.html',
  styleUrls: ['./timepicker-container.component.scss'],
})
export class MzTimepickerContainerComponent {
  @Input() inline: boolean;
}
