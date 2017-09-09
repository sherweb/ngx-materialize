import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import {
    MzTabComponent,
    MzTabItemComponent,
} from './';

fdescribe('MzCollapsibleComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzTabComponent,
        MzTabItemComponent,
        MzTestWrapperComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  describe('tab', () => {

    let nativeElement: any;

    function tab() {
      return nativeElement.querySelector('.tabs');
    }

    function tabItem() {
      return tab().querySelector('.tab');
    }

    function tabContent() {
      return nativeElement.querySelector('mz-tab-item');
    }

    it('should transclude tab item', async() => {

      buildComponent<MzTabComponent>(`
        <mz-tab>
          <mz-tab-item [label]="'label'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tab()).toBeTruthy();
        expect(tabItem().querySelector('a').innerHTML.trim()).toBe('label');
        expect(tabItem().querySelector('a').getAttribute('href')).toBe('#label');
        expect(tabContent().querySelector('div').innerHTML.trim()).toBe('content');
      });
    });

    it('should have fixed tab item when provided', async() => {

      buildComponent<MzTabComponent>(`
        <mz-tab [fixedTabWidth]="'true'">
          <mz-tab-item [label]="'label'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tab()).toBeTruthy();
        expect(tab().classList).toContain('tabs-fixed-width');
      });
    });

    it('should have active tab item when provided', async() => {

      buildComponent<MzTabComponent>(`
        <mz-tab>
          <mz-tab-item [active]="'true"' [label]="'label'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tabItem().querySelector('a').classList).toContain('active');
      });
    });

    it('should have disabled tab item when provided', async() => {

      buildComponent<MzTabComponent>(`
        <mz-tab>
          <mz-tab-item [disabled]="'true'" [label]="'label'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tabItem().classList).toContain('disabled');
      });
    });

    it('should have tab item with external link when provided', async() => {

      buildComponent<MzTabComponent>(`
        <mz-tab>
          <mz-tab-item [href]="'https://wwww.google.com'" [label]="'label'" [target]="'_blank'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tabItem().querySelector('a').getAttribute('href')).toBe('https://wwww.google.com');
        expect(tabItem().querySelector('a').getAttribute('target')).toBe('_blank');
      });
    });
  });
});
