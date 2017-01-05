import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class MzIconComponent {
  @Input() icon: string;
  @Input() iconAlign: string;
  @Input() iconClass: string;
  @Input() mdiIcon: string;
  @Input() mdiIconSize: string;
}
