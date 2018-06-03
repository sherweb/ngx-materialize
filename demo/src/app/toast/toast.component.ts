import { Component } from '@angular/core';
import { MzToastService } from 'ngx-materialize';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class ToastComponent {

  properties = [
    {
      name: 'message',
      type: 'string',
      description: 'Toast message to display',
    },
    {
      name: 'displayLength',
      type: 'number',
      description: 'Display time in milliseconds before toast is dismissed',
    },
    {
      name: 'className',
      type: 'string',
      description: 'CSS class name to apply on the toast',
    },
    {
      name: 'completeCallback',
      type: 'Function',
      description: 'Callback function to execute after toast is dismissed',
    },
  ];

  constructor(
    private toastService: MzToastService,
  ) { }

  showBasicToast() {
    this.toastService.show('I am a toast!', 4000);
  }

  showStyledToast() {
    this.toastService.show('I am a green toast!', 4000, 'green rounded');
  }

  showCustomToast() {
    this.toastService.show(
      `<span>I am a custom toast!</span>
       <button class="btn-flat white-text medium" onclick="alert('Toast action button has been clicked')">CLICK ME</button>`,
      4000);
  }

  showCallbackToast() {
    this.toastService.show('I am a callback toast!', 4000, null, () => alert('Toast has been dismissed'));
  }
}
