import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzSwitchContainerComponent } from './switch-container';
import { MzSwitchDirective } from './switch.directive';


describe('MzSwitchDirective:view', () => {
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

  describe('input', () => {

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input[mz-switch]');
    }

    it('should set input type to checkbox', async(() => {

      buildComponent(`
        <mz-switch-container>
          <input mz-switch>
        </mz-switch-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().type).toBe('checkbox');
      });
    }));

    it('should log an error in console when mz-switch is not wrapped inside mz-switch-container', async(() => {

      spyOn(console, 'error');

      buildComponent(`
        <input mz-switch>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(console.error).toHaveBeenCalledWith(
          'Input with mz-switch directive must be placed inside an [mz-switch-container] tag',
          $(input()));
      });
    }));
  });
});
