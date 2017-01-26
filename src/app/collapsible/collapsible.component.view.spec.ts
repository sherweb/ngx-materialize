import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import {
    MzCollapsibleComponent,
    MzCollapsibleItemBodyDirective,
    MzCollapsibleItemComponent,
    MzCollapsibleItemHeaderDirective,
} from './';

describe('MzCollapsibleComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzCollapsibleComponent,
        MzCollapsibleItemComponent,
        MzCollapsibleItemBodyDirective,
        MzCollapsibleItemHeaderDirective,
        MzTestWrapperComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  describe('collapsible', () => {

    let nativeElement: any;

    function collapsible() {
      return nativeElement.querySelector('.collapsible');
    }

    function collapsibleItem() {
      return collapsible().querySelector('li');
    }

    function forceSetTimeoutEnd() {
      tick(1 * 1000000); // todo: understand why 1 is not working (setTimeOut is set to 0)
    }

    it('should display a collapsible', async(() => {

      buildComponent<MzCollapsibleComponent>(`<mz-collapsible></mz-collapsible>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collapsible()).toBeTruthy();
      });
    }));

    it('should have mode when provided', async(() => {

      buildComponent<MzCollapsibleComponent>(`<mz-collapsible [mode]="'accordion'"></mz-collapsible>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collapsible().getAttribute('data-collapsible')).toContain('accordion');
      });
    }));

    it('should have popout when provided', async(() => {

      buildComponent<MzCollapsibleComponent>(`<mz-collapsible [popout]="true"></mz-collapsible>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collapsible().classList).toContain('popout');
      });
    }));

    it('should transclude collapsible item', fakeAsync(() => {

      buildComponent<MzCollapsibleComponent>(`
        <mz-collapsible>
          <mz-collapsible-item>
          </mz-collapsible-item>
        </mz-collapsible>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        forceSetTimeoutEnd();

        const transcludeContentBody = collapsibleItem().querySelector('.collapsible-body');
        const transcludeContentHeader = collapsibleItem().querySelector('.collapsible-header');

        expect(transcludeContentBody).toBeTruthy();
        expect(transcludeContentHeader).toBeTruthy();
      });
    }));
  });
});
