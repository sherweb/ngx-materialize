import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

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

    function collapsible(): HTMLUListElement {
      return nativeElement.querySelector('.collapsible');
    }

    function collapsibleItem(): HTMLLIElement {
      return collapsible().querySelector('li');
    }

    it('should display a collapsible', async(() => {

      buildComponent(`<mz-collapsible></mz-collapsible>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collapsible()).toBeTruthy();
      });
    }));

    it('should have mode when provided', async(() => {

      buildComponent(`<mz-collapsible [mode]="'accordion'"></mz-collapsible>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collapsible().getAttribute('data-collapsible')).toContain('accordion');
      });
    }));

    it('should have popout when provided', async(() => {

      buildComponent(`<mz-collapsible [popout]="true"></mz-collapsible>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collapsible().classList).toContain('popout');
      });
    }));

    it('should be hidden when there is no collapsible items', async(() => {

      buildComponent<{ visible: boolean }>(`
        <mz-collapsible>
          <mz-collapsible-item *ngIf="visible">
          </mz-collapsible-item>
        </mz-collapsible>
      `, {
        visible: true,
      }).then((fixture) => {
        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collapsible().hasAttribute('hidden')).toBeFalsy();

        component.visible = false;
        fixture.detectChanges();

        expect(collapsible().hasAttribute('hidden')).toBeTruthy();
      });
    }));

    it('should transclude collapsible item', async(() => {

      buildComponent(`
        <mz-collapsible>
          <mz-collapsible-item>
          </mz-collapsible-item>
        </mz-collapsible>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludeContentBody = collapsibleItem().querySelector('.collapsible-body');
        const transcludeContentHeader = collapsibleItem().querySelector('.collapsible-header');

        expect(transcludeContentBody).toBeTruthy();
        expect(transcludeContentHeader).toBeTruthy();
      });
    }));
  });
});
