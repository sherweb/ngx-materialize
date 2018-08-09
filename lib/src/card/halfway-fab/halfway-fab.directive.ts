import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: `
    a[mz-halfway-fab],
    a[mzHalfwayFab],
    button[mz-halfway-fab],
    button[mzHalfwayFab]`,
})
export class MzHalfwayFabDirective {
  @HostBinding('class.halfway-fab') true;
}
