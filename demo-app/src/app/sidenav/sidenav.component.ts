import { Component, HostListener } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class SidenavComponent {
  sidenavCollapsibleProperties: IPropertyRow[] = [
    { name: 'onClose',
      mandatory: false,
      type: 'Function',
      description: `Function that will be called when a collapsible section is closed`,
    },
    { name: 'onOpen',
      mandatory: false,
      type: 'Function',
      description: `Function that will be called when a collapsible section is opened`,
    },
  ];

  sidenavLinkProperties: IPropertyRow[] = [
    { name: 'active',
      mandatory: false,
      type: 'boolean',
      description: `Denote the current link as active`,
      defaultValue: `false`,
    },
  ];

  sidenavProperties: IPropertyRow[] = [
    { name: 'backgroundClass',
      mandatory: false,
      type: 'string',
      description: `Allow css class to be applied on the sidenav`,
    },
    { name: 'collapseButtonId',
      mandatory: true,
      type: 'string',
      description: `Id of the collapse button`,
    },
    { name: 'closeOnClick',
      mandatory: false,
      type: 'boolean',
      description: `Closes side-nav on link clicks, useful for non-fixed navigation`,
      defaultValue: `false`,
    },
    { name: 'draggable',
      mandatory: false,
      type: 'boolean',
      description: `Choose whether you can drag to open side-nav on touch screens`,
      defaultValue: `true`,
    },
    { name: 'edge',
      mandatory: false,
      type: 'string',
      description: `Choose the horizontal side navigation opening origin, can be <code class="language-markup">left</code>
        or <code class="language-markup">right</code>`,
      defaultValue: `left`,
    },
    { name: 'fixed',
      mandatory: false,
      type: 'boolean',
      description: `Side navigation will be fixed on small and medium resolution screen while hidden on small resolution`,
      defaultValue: `false`,
    },
    { name: 'id',
      mandatory: true,
      type: 'string',
      description: `Id of the side navigation`,
    },
    { name: 'onClose',
      mandatory: false,
      type: 'Function',
      description: `Function that will be called when side-nav is closed`,
    },
    { name: 'onOpen',
      mandatory: false,
      type: 'Function',
      description: `Function that will be called when side-nav is opened`,
    },
    { name: 'width',
      mandatory: false,
      type: 'number',
      description: `Side navigation width`,
      defaultValue: `300`,
    },
  ];

  sidenavVariableProperties: IPropertyRow[] = [
    { name: 'opened',
      mandatory: false,
      type: 'boolean',
      description: `Get or Set opened state of the sidenav`,
      defaultValue: 'false',
    },
  ];

  // Hide sidenav-demo during route animation
  @HostListener('@routeAnimation.start', ['$event']) onRouteAnimationStart(event: Event) {
    $('#sidenav-demo').css('display', 'none');
  }

  // Make sidenav-demo visible again after route animation
  @HostListener('@routeAnimation.done', ['$event']) onRouteAnimationDone(event: Event) {
    $('#sidenav-demo').css('display', 'block');
  }
}
