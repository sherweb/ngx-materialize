import { Component, OnDestroy, OnInit } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class ProgressComponent implements OnInit, OnDestroy {
  properties: IPropertyRow[] = [
    { name: 'backgroundClass',
      mandatory: false,
      type: 'string',
      description: `Background css class to be applied on the progress`,
    },
    { name: 'percentage',
      mandatory: false,
      type: 'number',
      description: `Percentage of progress completion`,
    },
    { name: 'progressClass',
      mandatory: false,
      type: 'string',
      description: `Progress css class to be applied on the progress`,
    },
  ];

  private _setIntervalId: NodeJS.Timer;
  private _interval = 25;
  public determinate = 25;

  ngOnInit() {
    this._setIntervalId =
      setInterval(() => {
        this.determinate = this.determinate < 100
          ? this.determinate + this._interval
          : 0;
      }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this._setIntervalId);
  }
}
