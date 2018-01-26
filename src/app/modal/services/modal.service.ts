import {
  ComponentRef,
  Injectable,
  Type,
} from '@angular/core';

import { MzInjectionService } from '../../shared/injection/injection.service';
import { MzBaseModal } from '../modal-base';

@Injectable()
export class MzModalService {

  constructor(
    private injectionService: MzInjectionService,
  ) { }

  /**
   * Open modal component.
   *
   * @param {Type<MzBaseModal>} componentClass
   * @param {*} [options={}]
   * @returns {ComponentRef<MzBaseModal>}
   * @memberof MzModalService
   */
  open(componentClass: Type<MzBaseModal>, options: any = {}): ComponentRef<MzBaseModal> {
    const componentRef = this.injectionService.appendComponent(componentClass, options);
    componentRef.instance.modalComponent.onClose.first().subscribe(() => {
      componentRef.destroy();
    });
    return componentRef;
  }
}
