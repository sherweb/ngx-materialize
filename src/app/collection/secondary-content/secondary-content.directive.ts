import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[mzSecondaryContent], [mz-secondary-content]',
})
export class MzSecondaryContentDirective {
  @HostBinding('class.secondary-content') true;
}
