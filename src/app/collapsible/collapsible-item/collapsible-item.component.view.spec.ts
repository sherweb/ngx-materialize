import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { MzTestWrapperComponent, buildComponent } from '../../shared/test-wrapper';
import { MzCollapsibleItemComponent } from './collapsible-item.component';

describe('MzCollapsibleItemComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzCollapsibleItemComponent,
        MzTestWrapperComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  describe('collapsible item', () => {

    let nativeElement: any;

    function collapsibleItem(): HTMLElement {
      return nativeElement.querySelector('mz-collapsible-item');
    }

    it('should display a collapsible item', async(() => {

      buildComponent<MzCollapsibleItemComponent>(`<mz-collapsible-item>some-text</mz-collapsible-item>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collapsibleItem()).toBeTruthy();
      });
    }));

    it('should have active class when active property is provided', async(() => {

      buildComponent<MzCollapsibleItemComponent>(`<mz-collapsible-item [active]="'true'"></mz-collapsible-item>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(nativeElement.querySelector('.collapsible-header').classList).toContain('active');
      });
    }));

    it('should not have active class when active prop is not provided', async(() => {

      buildComponent<MzCollapsibleItemComponent>(`<mz-collapsible-item></mz-collapsible-item>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(nativeElement.querySelector('.collapsible-header').classList).not.toContain('active');
      });
    }));

    it('should transclude content', async(() => {

      buildComponent<MzCollapsibleItemComponent>(`
        <mz-collapsible-item>
          <mz-collapsible-item-header><span class="some-class-header">some-header</span></mz-collapsible-item-header>
          <mz-collapsible-item-body><p class="some-class-body">some-body</p></mz-collapsible-item-body>
        </mz-collapsible-item>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludeContentBody = collapsibleItem().querySelector('.collapsible-body p');
        const transcludeContentHeader = collapsibleItem().querySelector('.collapsible-header span');

        expect(transcludeContentBody).toBeTruthy();
        expect(transcludeContentBody.classList).toContain('some-class-body');
        expect(transcludeContentBody.innerHTML.trim()).toBe('some-body');

        expect(transcludeContentHeader).toBeTruthy();
        expect(transcludeContentHeader.classList).toContain('some-class-header');
        expect(transcludeContentHeader.innerHTML.trim()).toBe('some-header');
      });
    }));
  });
});
