import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MzCheckboxModule, MzInputModule, MzTooltipModule } from 'ngx-materialize';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzTooltipDirective } from './tooltip.directive';

describe('MzTooltipDirective:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MzCheckboxModule,
        MzInputModule,
        MzTooltipModule,
      ],
      declarations: [
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('ngAfterViewInit', () => {

    it('should call initTooltip method', () => {

      buildComponent(`
        <mz-input-container>
          <input mz-input mz-tooltip
            id="checkbox"
            [label]="'label-x'"
            [tooltip]="'tooltip-x'"
            type="checkbox">
        </mz-input-container>
      `).then((fixture) => {
        fixture.detectChanges();

        const directiveElement = fixture.debugElement.query(By.directive(MzTooltipDirective));
        const directiveInstance = directiveElement.injector.get(MzTooltipDirective);

        spyOn(directiveInstance, 'initTooltip');

        directiveInstance.ngAfterViewInit();

        expect(directiveInstance.initTooltip).toHaveBeenCalled();
      });
    });
  });


  describe('checkbox', () => {

    it('should add tooltip on label', async(() => {

      buildComponent(`
        <mz-checkbox-container>
          <input mz-checkbox mz-tooltip
            id="checkbox"
            [label]="'label-x'"
            [tooltip]="'tooltip-x'"
            type="checkbox">
        </mz-checkbox-container>
      `).then((fixture) => {
        fixture.detectChanges();

        const directiveElement = fixture.debugElement.query(By.directive(MzTooltipDirective));
        const directiveInstance = directiveElement.injector.get(MzTooltipDirective);
        expect(directiveInstance.targetElement.is('label')).toBeTruthy();
      });
    }));
  });
});
