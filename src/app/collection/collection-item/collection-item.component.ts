import { Component, Input } from '@angular/core';

import { MzRemoveComponentHost } from '../../shared/remove-component-host';

@Component({
  selector: 'mz-collection-item',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.scss'],
})
export class MzCollectionItemComponent extends MzRemoveComponentHost {
  @Input() avatar: boolean;
  @Input() dismissable: boolean;
}
