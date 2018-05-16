import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-textarea-container',
  templateUrl: './textarea-container.component.html',
  styleUrls: ['./textarea-container.component.scss'],
})
export class MzTextareaContainerComponent {
  @Input() inline: boolean;
}
