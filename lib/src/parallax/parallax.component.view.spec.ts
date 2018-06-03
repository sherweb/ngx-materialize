import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzParallaxComponent } from './parallax.component';

describe('MzParallaxComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzParallaxComponent,
        MzTestWrapperComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  describe('parallax-container', () => {

    let nativeElement: any;

    function parallaxContainer(): HTMLElement {
      return nativeElement.querySelector('.parallax-container');
    }

    it('should set parallax container default height value when not provided', async(() => {

      buildComponent<MzParallaxComponent>(`<mz-parallax></mz-parallax>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(parallaxContainer().style.height).toBe('500px');
      });
    }));

    it('should set parallax container height value when provided', async(() => {

      buildComponent<MzParallaxComponent>(`<mz-parallax [height]="300"></mz-parallax>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(parallaxContainer().style.height).toBe('300px');
      });
    }));
  });

  describe('parallax', () => {

    let nativeElement: any;

    function parallax(): HTMLElement {
      return nativeElement.querySelector('.parallax');
    }

    it('should transclude correctly', async(() => {

      buildComponent<MzParallaxComponent>(`
        <mz-parallax>
          parallax-x
        </mz-parallax>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(parallax().innerText.trim()).toBe('parallax-x');
      });
    }));
  });
});
