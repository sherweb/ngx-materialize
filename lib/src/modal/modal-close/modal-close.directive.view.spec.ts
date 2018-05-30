import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzModalComponent, MzModalFooterDirective } from '../modal.component';
import { MzModalCloseDirective } from './modal-close.directive';

describe('MzModalCloseDirective:view', () => {

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzModalCloseDirective,
        MzModalComponent,
        MzModalFooterDirective,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('onclick', () => {

    let nativeElement: any;

    function closeButton(): HTMLElement {
      return nativeElement.querySelector('button[mz-modal-close]');
    }

    function closeLink(): HTMLElement {
      return nativeElement.querySelector('a[mz-modal-close]');
    }

    it('should trigger closeModal method on modal component when used on a button', async(() => {

      buildComponent<MzModalComponent>(`
        <mz-modal>
          <mz-modal-footer>
            <button mz-modal-close>Close</button>
          </mz-modal-footer>
        </mz-modal>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        spyOn(MzModalComponent.prototype, 'closeModal');

        closeButton().click();

        expect(MzModalComponent.prototype.closeModal).toHaveBeenCalled();
      });
    }));

    it('should trigger closeModal method on modal component when used on a hyperlink', async(() => {

      buildComponent<MzModalComponent>(`
        <mz-modal>
          <mz-modal-footer>
            <a mz-modal-close>Close</a>
          </mz-modal-footer>
        </mz-modal>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        spyOn(MzModalComponent.prototype, 'closeModal');

        closeLink().click();

        expect(MzModalComponent.prototype.closeModal).toHaveBeenCalled();
      });
    }));
  });
});
