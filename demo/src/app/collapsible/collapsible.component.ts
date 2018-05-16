import { Component, ViewChild } from '@angular/core';
import { MzCollapsibleComponent } from 'ngx-materialize';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class CollapsibleComponent {

  @ViewChild('collapsibleProgrammatically') collapsibleProgrammatically: MzCollapsibleComponent;

  // fake data
  simpleCollapsibleItems = [
    {
      icon: 'cloud',
      header: 'First',
      body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,

    },
    {
      icon: 'flash',
      header: 'Second',
      body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      icon: 'gamepad',
      header: 'Third',
      body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
  ];

  // playground
  playgroundCollapsibleItems = [
    {
      icon: 'cloud',
      header: 'First',
      body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,

    },
    {
      icon: 'flash',
      header: 'Second',
      body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      icon: 'gamepad',
      header: 'Third',
      body: `
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
  ];

   // table properties
   collapsibleProperties: IPropertyRow[] = [
    { name: 'mode',
      mandatory: false,
      type: 'string',
      description: `Collapsible behavior style, could be <code class="language-markup">accordion</code>
        or <code class="language-markup">expandable</code>`,
      defaultValue: `accordion`,
    },
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
    { name: 'popout',
      mandatory: false,
      type: 'boolean',
      description: `Add popout animation when an item is clicked to show its section`,
      defaultValue: `false`,
    },
  ];

  collapsibleItemProperties: IPropertyRow[] = [
    { name: 'active',
      mandatory: false,
      type: 'boolean',
      description: `Preopen the item section from the collapsible`,
      defaultValue: `false`,
    },
  ];

  add() {
    this.playgroundCollapsibleItems.push({
      icon: 'plus',
      header: 'Added',
      body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    });
  }

  closeFirstSection() {
    this.collapsibleProgrammatically.close(0);
  }

  openFirstSection() {
    this.collapsibleProgrammatically.open(0);
  }

  remove() {
    this.playgroundCollapsibleItems.splice(this.playgroundCollapsibleItems.length - 1);
  }

  replace() {
    this.playgroundCollapsibleItems = [
      {
        icon: 'account',
        header: 'Fourth',
        body: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,

      },
      {
        icon: 'star',
        header: 'Fifth',
        body: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      },
      {
        icon: 'heart',
        header: 'Sixth',
        body: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      },
    ];
  }
 }
