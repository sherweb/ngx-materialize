import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[mzAvatar], [mz-avatar]',
})
export class MzAvatarDirective {
  @HostBinding('class.circle') true;
}
