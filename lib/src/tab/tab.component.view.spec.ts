import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import {
    MzTabComponent,
    MzTabItemComponent,
} from './';

describe('MzTabComponent:view', () => {

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

    function tab(): HTMLElement {
      return nativeElement.querySelector('.tabs');
    }

    function tabItems() {
      return tab().querySelectorAll('.tab');
    }

    function tabContent() {
      return nativeElement.querySelector('mz-tab-item');
    }

    it('should transclude tab item', async() => {

      buildComponent(`
        <mz-tab>
          <mz-tab-item [label]="'label'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tab()).toBeTruthy();
        expect(tabItems()[0].querySelector('a').innerHTML.trim()).toBe('label');
        expect(tabItems()[0].querySelector('a').getAttribute('href')).toBe('#label');
        expect(tabContent().querySelector('div').innerHTML.trim()).toBe('content');
      });
    });

    it('should have fixed tab item when provided', async() => {

      buildComponent(`
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

      buildComponent(`
        <mz-tab>
          <mz-tab-item [active]="'true'" [label]="'label'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tabItems()[0].querySelector('a').classList).toContain('active');
      });
    });

    it('should have disabled tab item when provided', async() => {

      buildComponent(`
        <mz-tab>
          <mz-tab-item [disabled]="'true'" [label]="'label'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tabItems()[0].classList).toContain('disabled');
      });
    });

    it('should have tab item with external link when provided', async() => {

      buildComponent(`
        <mz-tab>
          <mz-tab-item [href]="'https://wwww.google.com'" [label]="'label'" [target]="'_blank'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tabItems()[0].querySelector('a').getAttribute('href')).toBe('https://wwww.google.com');
        expect(tabItems()[0].querySelector('a').getAttribute('target')).toBe('_blank');
      });
    });

    it('should replace tab item id non alphanumeric characters', async() => {

      buildComponent(`
        <mz-tab>
          <mz-tab-item [label]="'lбabбel'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tabItems()[0].querySelector('a').getAttribute('href')).toBe('#label');
        expect(tabContent()[0].getAttribute('id')).toBe('label');
      });
    });

    it('should have tab item id', async() => {

      buildComponent(`
        <mz-tab>
          <mz-tab-item [tabItemId]="'tabItemId'" [label]="'label'">content</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(tabItems()[0].querySelector('a').getAttribute('href')).toBe('#tabItemId');
        expect(tabContent()[0].getAttribute('id')).toBe('tabItemId');
      });
    });

    it('should select tab item 2', async() => {

      buildComponent(`
        <mz-tab #tabs>
          <mz-tab-item [active]="'true'" [label]="'label1'">content1</mz-tab-item>
          <mz-tab-item [label]="'label2'">content2</mz-tab-item>
        </mz-tab>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        $(tab()).tabs('select_tab', 'label2');
        fixture.detectChanges();

        expect(tabItems()[1].querySelector('a').classList).toContain('active');
        expect(tabItems()[1].querySelector('a').innerHTML.trim()).toBe('label2');
      });
    });
  });
});
