import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzTextareaContainerComponent } from './textarea-container.component';

describe('MzTextareaContainerComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzTextareaContainerComponent,
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

      buildComponent<MzTextareaContainerComponent>(`
        <mz-textarea-container [inline]="true"></mz-textarea-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().classList).toContain('inline');
      });
    }));

    it('should not have inline css class when inline is false', async(() => {

      buildComponent<MzTextareaContainerComponent>(`
        <mz-textarea-container [inline]="false"></mz-textarea-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().classList).not.toContain('inline');
      });
    }));

    it('should transclude correctly', async(() => {

      buildComponent<MzTextareaContainerComponent>(`
        <mz-textarea-container>
          content-x
        </mz-textarea-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().innerText.trim()).toBe('content-x');
      });
    }));
  });
});
