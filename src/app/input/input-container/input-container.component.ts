import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
})
export class MzInputContainerComponent {
  @Input() inline: boolean;
}
