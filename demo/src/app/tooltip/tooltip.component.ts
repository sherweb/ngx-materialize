import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class TooltipComponent {
  // playground properties
  delay = 350;
  html = false;
  position = 'bottom';
  tooltip = 'I am a tooltip';

  // table properties
  properties: IPropertyRow[] = [
    { name: 'delay',
      mandatory: false,
      type: 'number',
      description: 'Delay time in milliseconds before tooltip appears',
      defaultValue: '350',
    },
    { name: 'html',
      mandatory: false,
      type: 'boolean',
      description: 'Allow custom html inside the tooltip when set to <code class="language-markup">true</code>',
      defaultValue: 'false',
    },
    { name: 'position',
      mandatory: false,
      type: 'string',
      description: 'Set the direction of the tooltip, could be either <code class="language-markup">bottom</code>, '
      + '<code class="language-markup">top</code>, <code class="language-markup">left</code> or <code class="language-markup">right</code>',
      defaultValue: 'bottom',
    },
    { name: 'tooltip',
      mandatory: true,
      type: 'string',
      description: 'Tooltip text (can use custom HTML if you set the <code class="language-markup">html</code> option)',
    },
  ];
}
