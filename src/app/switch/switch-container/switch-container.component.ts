import { Component, ContentChild } from '@angular/core';

import { MzSwitchDirective } from '../switch.directive';

@Component({
  selector: 'mz-switch-container',
  templateUrl: './switch-container.component.html',
  styleUrls: ['./switch-container.component.scss'],
})
export class MzSwitchContainerComponent {
  @ContentChild(MzSwitchDirective) mzSwitchDirective: MzSwitchDirective;
}
