import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzRadioButtonContainerComponent } from './radio-button-container.component';

describe('MzRadioButtonContainerComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzRadioButtonContainerComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('radio-button-field', () => {

    let nativeElement: any;

    function radioButtonField(): HTMLElement {
      return nativeElement.querySelector('p.radio-button-field');
    }

    it('should transclude correctly', async(() => {

      buildComponent<MzRadioButtonContainerComponent>(`
        <mz-radio-button-container>
          content-x
        </mz-radio-button-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(radioButtonField().innerText.trim()).toBe('content-x');
      });
    }));
  });
});
