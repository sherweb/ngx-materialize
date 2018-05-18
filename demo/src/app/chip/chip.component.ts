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
  // fake data
  private readonly fruits = [
    'Apple',
    'Banana',
    'Blueberry',
    'Cherry',
    'Cranberry',
    'Grape',
    'Grapefruit',
    'Kiwi',
    'Lemon',
    'Lime',
    'Melon',
    'Orange',
    'Papaya',
    'Pear',
    'Pineapple',
    'Rasberry',
    'Strawberry',
  ];

  // autocomplete
  autocompleteOptions: Materialize.AutoCompleteOptions = {
    data: {
      'Apple': null,
      'Microsoft': null,
      'Google': 'assets/google_g_logo.png',
    },
  };

  // control value
  playgroundValue: Materialize.ChipDataObject[] = [
    { tag: 'Banana' },
    { tag: 'Kiwi' },
    { tag: 'Mango' },
  ];

  value: Materialize.ChipDataObject[] = [
    { tag: 'Banana' },
    { tag: 'Kiwi' },
    { tag: 'Mango' },
  ];

  // mz-chip table properties
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

  // mz-chip-input table properties
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

  // playground functions
  addPlaygroundValue() {
    const index = this.getRandomNumber(0, this.fruits.length - 1);
    const fruitToAdd = this.fruits[index];
    this.playgroundValue = [
      ...this.playgroundValue,
      { tag: fruitToAdd },
    ];
  }

  removePlaygroundValue() {
    this.playgroundValue.pop();
    this.playgroundValue = [
      ...this.playgroundValue,
    ];
  }

  // mz-chip events
  onDeleteTag(tag: string) {
    alert(`Tag deleted: ${tag}`);
  }

  // mz-chip-input events
  onAdd(chip: Materialize.ChipDataObject) {
    alert(`Tag added: ${chip.tag}`);
  }

  onDelete(chip: Materialize.ChipDataObject) {
    alert(`Tag deleted: ${chip.tag}`);
  }

  onSelect(chip: Materialize.ChipDataObject) {
    alert(`Tag selected: ${chip.tag}`);
  }

  // helpers
  private getRandomNumber(min: number, max: number) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}
