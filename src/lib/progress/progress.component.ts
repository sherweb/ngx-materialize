import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class MzProgressComponent {
  @Input() backgroundClass: string;
  @Input() percentage: number;
  @Input() progressClass: string;
}
