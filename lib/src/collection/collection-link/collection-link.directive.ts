import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[mzCollectionLink], [mz-collection-link]',
})
export class MzCollectionLinkDirective {
  @HostBinding('class.active') @Input() active: boolean;
  @HostBinding('class.collection-item') true;
}
