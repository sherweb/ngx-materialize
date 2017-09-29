import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzSwitchDirective } from '../switch.directive';
import { MzSwitchContainerComponent } from './switch-container.component';

describe('MzSwitchContainerComponent:view', () => {
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSwitchDirective,
        MzSwitchContainerComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('switch', () => {

    function lever(): HTMLElement {
      return nativeElement.querySelector('.switch label span.lever');
    }

    function off(): HTMLElement {
      return nativeElement.querySelector('.switch label span.off');
    }

    function on(): HTMLElement {
      return nativeElement.querySelector('.switch label span.on');
    }

    function switchContainer(): HTMLElement {
      return nativeElement.querySelector('.switch');
    }

    function switchInput(): HTMLElement {
      return nativeElement.querySelector('.switch label input[mz-switch]');
    }

    it('should transclude correctly', async(() => {

      buildComponent(`
        <mz-switch-container>
          switch-content-x
        </mz-switch-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(switchContainer().innerText).toBe('switch-content-x');
      });
    }));

    it('should have on/off labels shown correctly when provided', async(() => {

      buildComponent(`
        <mz-switch-container>
          <input mz-switch [off]="'off-x'" [on]="'on-x'">
        </mz-switch-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(off().innerText).toBe('off-x');
        expect(switchInput()).toBeTruthy();
        expect(lever()).toBeTruthy();
        expect(on().innerText).toBe('on-x');
      });
    }));

    it('should have on/off labels shown correctly when not provided', async(() => {

      buildComponent(`
        <mz-switch-container>
          <input mz-switch>
        </mz-switch-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(off().innerText).toBe('');
        expect(switchInput()).toBeTruthy();
        expect(lever()).toBeTruthy();
        expect(on().innerText).toBe('');
      });
    }));
  });
});
