import { AfterViewInit, Component, Renderer } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class CheckboxComponent implements AfterViewInit {

  // playground
  checkboxLabel = 'Label';
  checkboxFilledIn = false;
  checkboxDisabled = false;
  checkboxValue = true;

  // table properties
  properties: IPropertyRow[] = [
    { name: 'id',
      mandatory: true,
      type: 'string',
      description: `Id of the checkbox`,
    },
    { name: 'label',
      mandatory: false,
      type: 'string',
      description: `Label text`,
    },
    { name: 'filledIn',
      mandatory: false,
      type: 'boolean',
      description: `Show filled in checkbox style`,
      defaultValue: `false`,
    },
  ];

  constructor(private renderer: Renderer) { }

  ngAfterViewInit() {
    this.forceIndeterminate();
  }

  forceIndeterminate() {
    const checkboxElements = $('#indeterminate-checkbox, #filledin-indeterminate-checkbox');
    checkboxElements.each((index, element) => {
      this.renderer.setElementProperty(element, 'indeterminate', true);
    });
  }
}
