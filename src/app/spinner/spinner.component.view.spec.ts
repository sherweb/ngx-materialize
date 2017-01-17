import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzSpinnerComponent } from './spinner.component';

describe('MzSpinnerComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSpinnerComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('preloader-wrapper', () => {

    let nativeElement: any;

    function preloaderWrapper(): HTMLElement {
      return nativeElement.querySelector('.preloader-wrapper');
    }

    it('should apply size css class when provided', async(() => {

      buildComponent<MzSpinnerComponent>(`<mz-spinner [size]="'size-x'"></mz-spinner>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(preloaderWrapper().classList).toContain('size-x');
      });
    }));

    it('should not apply size css class when not provided', async(() => {

      buildComponent<MzSpinnerComponent>(`<mz-spinner></mz-spinner>`).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(component.size).toBeUndefined();
        expect(preloaderWrapper().classList.length).toBe(2);
        expect(preloaderWrapper().classList).toContain('preloader-wrapper');
        expect(preloaderWrapper().classList).toContain('active');
      });
    }));
  });

  describe('spinner-layer', () => {

    let nativeElement: any;

    function spinnerLayer(): HTMLElement {
      return nativeElement.querySelector('.spinner-layer');
    }

    it('should have spinner-{color}-only css class when color is provided', async(() => {

      buildComponent<MzSpinnerComponent>(`<mz-spinner [color]="color"></mz-spinner>`).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;

        ['red', 'green', 'blue', 'yellow'].forEach((color) => {

          component.color = color;
          fixture.detectChanges();

          expect(spinnerLayer().classList.length).toBe(2);
          expect(spinnerLayer().classList).toContain('spinner-layer');
          expect(spinnerLayer().classList).toContain(`spinner-${color}-only`);
        });
      });
    }));

    it('should not have spinner-{color}-only css class when color is not provided', async(() => {

      buildComponent<MzSpinnerComponent>(`<mz-spinner></mz-spinner>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(spinnerLayer().classList.length).toBe(1);
        expect(spinnerLayer().classList).toContain('spinner-layer');
      });
    }));
  });
});
