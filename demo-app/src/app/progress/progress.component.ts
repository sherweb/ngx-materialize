import { Component, OnInit, OnDestroy } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routes.animation';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class ProgressComponent implements OnInit, OnDestroy {
  private _setIntervalId: NodeJS.Timer;
  private _interval: number = 25;
  public determinate: number = 25;

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
