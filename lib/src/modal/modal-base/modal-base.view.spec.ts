import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzModalComponent } from '../modal.component';
import { MzBaseModal } from './modal-base';

@Component({
  selector: 'mz-test-modal',
  template: `<mz-modal></mz-modal>`,
})
class MzTestModalComponent extends MzBaseModal { }

describe('MzBaseModal:view', () => {

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzModalComponent,
        MzTestModalComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('ngAfterViewInit', () => {

    it('should open modal component', async(() => {

      spyOn(MzModalComponent.prototype, 'openModal');

      buildComponent(
        `<mz-test-modal></mz-test-modal>`,
      ).then(fixture => {
        fixture.detectChanges();

        expect(MzModalComponent.prototype.openModal).toHaveBeenCalled();
      });
    }));
  });
});
