import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-datepicker-container',
  templateUrl: './datepicker-container.component.html',
  styleUrls: ['./datepicker-container.component.scss'],
})
export class MzDatepickerContainerComponent {
  @Input() inline: boolean;
}
