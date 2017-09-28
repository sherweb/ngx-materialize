import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class IconComponent {
  properties: IPropertyRow[] = [
    { name: 'align',
      mandatory: false,
      type: 'string',
      description: `Alignement of the icon. Possible values: <code class="language-markup">center</code>,
        <code class="language-markup">left</code>, or <code class="language-markup">right</code>`,
      defaultValue: 'left',
    },
    { name: 'flip',
      mandatory: false,
      type: 'string',
      description: `<strong>Only for <code class="language-markup">mz-icon-mdi</code></strong><br />
        Flip the icon. Possible values: <code class="language-markup">h</code> (horizontal) or
        <code class="language-markup">v</code> (vertical)`,
    },
    { name: 'icon',
      mandatory: true,
      type: 'string',
      description: `The name of the icon`,
    },
    { name: 'rotate',
      mandatory: false,
      type: 'string',
      description: `<strong>Only for <code class="language-markup">mz-icon-mdi</code></strong><br />
        Rotate the icon by 45 degree increments. Possible values: <code class="language-markup">45</code>,
        <code class="language-markup">90</code>, <code class="language-markup">135</code>, <code class="language-markup">180</code>,
        <code class="language-markup">225</code>, <code class="language-markup">270</code>, or <code class="language-markup">315</code>`,
    },
    { name: 'size',
      mandatory: false,
      type: 'string',
      description: `Icon size to be applied on the icon. <br />
        For <code class="language-markup">mz-icon</code> directive: <code class="language-markup">tiny</code>,
        <code class="language-markup">small</code>, <code class="language-markup">medium</code>,
        or <code class="language-markup">large</code>.<br />
        For <code class="language-markup">mz-icon-mdi</code> directive: <code class="language-markup">18px</code>,
        <code class="language-markup">24px</code>, <code class="language-markup">36px</code>,
        or <code class="language-markup">48px</code>`,
      defaultValue: `Default value for <code class="language-markup">mz-icon-mdi</code> is <code class="language-markup">24px</code>`,
    },
  ];
}
