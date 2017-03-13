import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class SpinnerComponent {
  properties: IPropertyRow[] = [
    { name: 'color',
      mandatory: false,
      type: 'string',
      description: `Spinner color, could be <code class="language-markup">red</code>, <code class="language-markup">green</code>,
        <code class="language-markup">blue</code> or <code class="language-markup">yellow</code>`,
      defaultValue: `default color`,
    },
    { name: 'size',
      mandatory: false,
      type: 'string',
      description: `Spinner size, could be <code class="language-markup">small</code>, <code class="language-markup">medium</code>
        or <code class="language-markup">big</code>`,
      defaultValue: `medium`,
    },
  ];
}
