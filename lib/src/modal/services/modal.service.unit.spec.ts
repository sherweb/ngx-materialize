import { Component, ComponentRef, EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MzInjectionService } from '../../shared/injection/injection.service';
import { MzBaseModal } from '../modal-base';
import { MzModalComponent } from '../modal.component';
import { MzModalService } from './modal.service';

@Component({
  selector: 'mz-test-modal',
  template: `<mz-modal></mz-modal>`,
})
class MzTestModalComponent extends MzBaseModal { }

describe('MzModalService:unit', () => {
  let injectionService: MzInjectionService;
  let modalService: MzModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzModalComponent,
        MzTestModalComponent,
      ],
      providers: [
        MzInjectionService,
        MzModalService,
      ],
    });
  });

  beforeEach(() => {
    injectionService = TestBed.get(MzInjectionService);
    modalService = TestBed.get(MzModalService);
  });

  describe('open', () => {

    const mockComponentRef = <ComponentRef<MzBaseModal>>{
      destroy: () => null,
      instance: {
        modalComponent: {
          close: new EventEmitter<void>(),
        },
      },
    };

    it('should call MzInjectionService correctly', () => {

      spyOn(injectionService, 'appendComponent').and.returnValue(mockComponentRef);

      const options = { modal: true };

      modalService.open(MzTestModalComponent, options);

      expect(injectionService.appendComponent).toHaveBeenCalledWith(MzTestModalComponent, options);
    });

    it('should destroy created modal component when close event is emmited', () => {

      spyOn(injectionService, 'appendComponent').and.returnValue(mockComponentRef);
      spyOn(mockComponentRef, 'destroy');

      modalService.open(MzTestModalComponent);

      mockComponentRef.instance.modalComponent.close.emit();

      expect(mockComponentRef.destroy).toHaveBeenCalled();
    });

    it('should return component reference correctly', () => {

      spyOn(injectionService, 'appendComponent').and.returnValue(mockComponentRef);

      expect(modalService.open(MzTestModalComponent)).toBe(mockComponentRef);
    });
  });
});
