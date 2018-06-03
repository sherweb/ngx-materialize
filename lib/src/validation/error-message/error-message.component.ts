import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ErrorMessageResource } from './models/index';

@Component({
  selector: 'mz-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(-5px)', opacity: 0 }),
          animate('300ms', style({ transform: 'translateY(0)', opacity: 1 })),
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('300ms', style({ transform: 'translateY(-5px)', opacity: 0 })),
        ]),
      ],
    ),
  ],
})
export class MzErrorMessageComponent implements OnDestroy, OnInit {

  @Input() control: AbstractControl;
  @Input() errorMessageResource: ErrorMessageResource;

  controlStatusChangesSubscription: Subscription;
  errorMessage = '';

  ngOnInit() {
    this.buildErrorMessage();
    this.controlStatusChangesSubscription = this.control.statusChanges.subscribe(() => this.buildErrorMessage());
  }

  ngOnDestroy(): void {
    this.controlStatusChangesSubscription.unsubscribe();
  }

  buildErrorMessage() {
    this.errorMessage = '';
    if (this.control.errors && this.errorMessageResource) {
        Object.keys(this.control.errors).forEach(key => {
          this.errorMessage += this.errorMessageResource[key] + ' ';
        });
    }
  }
}
