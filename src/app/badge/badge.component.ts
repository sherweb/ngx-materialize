import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class MzBadgeComponent {
  @Input() badgeClass: string;
  @Input() caption: string;
  @Input() new: boolean;
  @Input() value: number;
}
