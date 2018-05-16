import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzModalComponent, MzModalContentDirective, MzModalFooterDirective, MzModalHeaderDirective } from './modal.component';

describe('MzModalComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzModalComponent,
        MzModalContentDirective,
        MzModalFooterDirective,
        MzModalHeaderDirective,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('modal', () => {
    let nativeElement: any;

    function modal(): HTMLElement {
      return nativeElement.querySelector('.modal');
    }

    it('should have modal-fixed-footer class when property is true', async(() => {

      buildComponent<MzModalComponent>(
        `<mz-modal [fixedFooter]="true"></mz-modal>`,
      ).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(modal().classList).toContain('modal-fixed-footer');
      });
    }));

    it('should not have modal-fixed-footer class when property is false/null/undefined', async(() => {

      [false, null, undefined].forEach(useCase => {
        buildComponent<MzModalComponent>(
          `<mz-modal [fixedFooter]="fixedFooter"></mz-modal>`,
          { fixedFooter: useCase },
        ).then(fixture => {
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          expect(modal().classList).not.toContain('modal-fixed-footer');
        });
      });
    }));

    it('should have bottom-sheet class when property is true', async(() => {

      buildComponent<MzModalComponent>(
        `<mz-modal [bottomSheet]="true"></mz-modal>`,
      ).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(modal().classList).toContain('bottom-sheet');
      });
    }));

    it('should not have bottom-sheet class when property is false/null/undefined', async(() => {

      [false, null, undefined].forEach(useCase => {
        buildComponent<MzModalComponent>(
          `<mz-modal [bottomSheet]="bottomSheet"></mz-modal>`,
          { bottomSheet: useCase },
        ).then(fixture => {
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          expect(modal().classList).not.toContain('bottom-sheet');
        });
      });
    }));

    it('should have modal-fullscreen class when property is true', async(() => {

      buildComponent<MzModalComponent>(
        `<mz-modal [fullscreen]="true"></mz-modal>`,
      ).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(modal().classList).toContain('modal-fullscreen');
      });
    }));

    it('should have modal-fullscreen class when property is false/null/undefined', async(() => {

      [false, null, undefined].forEach(useCase => {
        buildComponent<MzModalComponent>(
          `<mz-modal [fullscreen]="fullscreen"></mz-modal>`,
          { fullscreen: useCase },
        ).then(fixture => {
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          expect(modal().classList).not.toContain('modal-fullscreen');
        });
      });
    }));
  });

  describe('modal-content', () => {
    let nativeElement: any;

    function modalHeader(): HTMLElement {
      return nativeElement.querySelector('mz-modal-header');
    }

    function modalContent(): HTMLElement {
      return nativeElement.querySelector('mz-modal-content');
    }

    it('should transclude mz-modal-header', async(() => {

      buildComponent<MzModalComponent>(`
        <mz-modal>
          <mz-modal-header>header-x</mz-modal-header>
        </mz-modal>
      `).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(modalHeader().innerHTML).toContain('header-x');
      });
    }));

    it('should transclude mz-modal-content', async(() => {

      buildComponent<MzModalComponent>(`
        <mz-modal>
          <mz-modal-content>content-x</mz-modal-content>
        </mz-modal>
      `).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(modalContent().innerHTML).toContain('content-x');
      });
    }));
  });

  describe('modal-footer', () => {
    let nativeElement: any;

    function modalFooter(): HTMLElement {
      return nativeElement.querySelector('mz-modal-footer');
    }

    it('should transclude mz-modal-footer', async(() => {

      buildComponent<MzModalComponent>(`
        <mz-modal>
          <mz-modal-footer>footer-x</mz-modal-footer>
        </mz-modal>
      `).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(modalFooter().innerHTML).toContain('footer-x');
      });
    }));
  });
});
