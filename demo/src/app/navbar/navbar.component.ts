import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class NavbarComponent {
  navbarProperties: IPropertyRow[] = [
    { name: 'navbarClass',
      mandatory: false,
      type: 'string',
      description: `Navbar css class to be applied on the navbar`,
    },
  ];

  navbarItemContainerProperties: IPropertyRow[] = [
    { name: 'align',
      mandatory: false,
      type: 'string',
      description: `Alignment of the item-container, could be <code class="language-markup">left</code>
        or <code class="language-markup">right</code>`,
    },
  ];

  navbarItemProperties: IPropertyRow[] = [
    { name: 'active',
      mandatory: false,
      type: 'boolean',
      description: `Denote the current item as active`,
      defaultValue: `false`,
    },
    { name: 'itemClass',
      mandatory: false,
      type: 'string',
      description: `Css class to be applied on the navbar item`,
    },
  ];
}
