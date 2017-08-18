import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzDatepickerContainerComponent } from './datepicker-container.component';

describe('MzDatepickerContainerComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzDatepickerContainerComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('input-field', () => {
    let nativeElement: any;

    function inputField(): HTMLElement {
      return nativeElement.querySelector('.input-field');
    }

    it('should have inline css class when inline is true', async(() => {

      buildComponent<MzDatepickerContainerComponent>(`
        <mz-datepicker-container [inline]="true"></mz-datepicker-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().classList).toContain('inline');
      });
    }));

    it('should not have inline css class when inline is false', async(() => {

      buildComponent<MzDatepickerContainerComponent>(`
        <mz-datepicker-container [inline]="false"></mz-datepicker-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().classList).not.toContain('inline');
      });
    }));

    it('should transclude correctly', async(() => {

      buildComponent<MzDatepickerContainerComponent>(`
        <mz-datepicker-container>
          content-x
        </mz-datepicker-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().innerText.trim()).toBe('content-x');
      });
    }));
  });
});
