import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzInputContainerComponent } from './input-container.component';

describe('MzInputContainerComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzInputContainerComponent,
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

      buildComponent<MzInputContainerComponent>(`
        <mz-input-container [inline]="true"></mz-input-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().classList).toContain('inline');
      });
    }));

    it('should not have inline css class when inline is false', async(() => {

      buildComponent<MzInputContainerComponent>(`
        <mz-input-container [inline]="false"></mz-input-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().classList).not.toContain('inline');
      });
    }));

    it('should transclude correctly', async(() => {

      buildComponent<MzInputContainerComponent>(`
        <mz-input-container>
          content-x
        </mz-input-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().innerText.trim()).toBe('content-x');
      });
    }));
  });
});
