import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class ChipComponent {
  autocompleteOptions: Materialize.AutoCompleteOptions = {
    data: {
      'Apple': null,
      'Microsoft': null,
      'Google': 'assets/google_g_logo.png',
    },
  };

  value: Materialize.ChipDataObject[] = [
    { tag: 'Banana' },
    { tag: 'Kiwi' },
    { tag: 'Mango' },
  ];

  // table properties
  chipProperties: IPropertyRow[] = [
    { name: 'close',
      mandatory: false,
      type: 'boolean',
      description: 'Show close icon allowing chip to be removed',
      defaultValue: 'false',
    },
    { name: 'delete',
      mandatory: false,
      type: 'EventEmitter<string>',
      description: 'Event emitted when a chip is deleted',
    },
  ];

  chipInputProperties: IPropertyRow[] = [
    { name: 'autocompleteOptions',
      mandatory: false,
      type: 'Materialize.AutoCompleteOptions',
      description: `Set autocomplete options (data, limit, minLength)`,
    },
    { name: 'placeholder',
      mandatory: false,
      type: 'string',
      description: `First placeholder when there is no tags`,
    },
    { name: 'secondaryPlaceholder',
      mandatory: false,
      type: 'string',
      description: `Secondary placeholder when adding additional tag`,
    },
    { name: 'add',
      mandatory: false,
      type: 'EventEmitter<Materialize.ChipDataObject[]>',
      description: `Event emitted when a chip is added`,
    },
    { name: 'delete',
      mandatory: false,
      type: 'EventEmitter<Materialize.ChipDataObject[]>',
      description: `Event emitted when a chip is deleted`,
    },
    { name: 'select',
      mandatory: false,
      type: 'EventEmitter<Materialize.ChipDataObject[]>',
      description: `Event emitted when a chip is selected`,
    },
  ];

  onDeleteTag(tag: string) {
    alert(`Tag deleted: ${tag}`);
  }

  onAdd(chip: Materialize.ChipDataObject) {
    alert(`Tag added: ${chip.tag}`);
  };

  onDelete(chip: Materialize.ChipDataObject) {
    alert(`Tag deleted: ${chip.tag}`);
  }

  onSelect(chip: Materialize.ChipDataObject) {
    alert(`Tag selected: ${chip.tag}`);
  }
}
