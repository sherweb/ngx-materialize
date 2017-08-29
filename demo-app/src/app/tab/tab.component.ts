import { Component } from '@angular/core';
import { IPropertyRow } from './../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  tabItemProperties: IPropertyRow[] = [
    {
      name: 'active',
      mandatory: false,
      type: 'boolean',
      description: `When enabled each tab item will have the same width`,
      defaultValue: `false`,
    },
    {
      name: 'disabled',
      mandatory: false,
      type: 'boolean',
      description: `When enabled each tab item will have the same width`,
      defaultValue: `false`,
    },
    {
      name: 'href',
      mandatory: false,
      type: 'string',
      description: `URL to link to an external page`,
    },
    {
      name: 'target',
      mandatory: false,
      type: 'string',
      description: `Force a tab to behave as a regular hyperlink. The value could be <code class="language-markup">_blank</code>`
                    + `(open a new window) and <code class="language-markup">_self</code> (open in same window).`,
    },
  ];

  tabProperties: IPropertyRow[] = [
    {
      name: 'fixedTabWidth',
      mandatory: false,
      type: 'boolean',
      description: `When enabled each tab item will have the same width`,
      defaultValue: `false`,
    },
    {
      name: 'onShow',
      mandatory: false,
      type: 'Function',
      description: `Function that will be called when the tab is changed. The callback provides a parameter which refers to the current`
                    + `tab being shown.`,
    },
    {
      name: 'responsiveThreshold',
      mandatory: false,
      type: 'number',
      description: `	The maximum width of the screen, in pixels, where the swipeable functionality initializes`,
      defaultValue: `Infinity`,
    },
    {
      name: 'swipeable',
      mandatory: false,
      type: 'boolean',
      description: `Function that will be called when a collapsible section is opened`,
      defaultValue: `false`,
    },
  ];
}
