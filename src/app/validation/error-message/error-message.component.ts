import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
} from '@angular/core';

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
export class MzErrorMessageComponent {

  @Input() errorMessage: string;
}
