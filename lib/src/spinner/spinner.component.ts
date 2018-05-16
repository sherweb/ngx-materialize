import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class MzSpinnerComponent {
  @Input() color: string;
  @Input() size: string; // small, medium, big
}
