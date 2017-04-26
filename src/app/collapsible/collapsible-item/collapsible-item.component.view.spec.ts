import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
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
      return nativeElement.querySelector('li');
    }

    function collapsibleItemBody(): HTMLElement {
      return nativeElement.querySelector('.collapsible-body');
    }

    function collapsibleItemHeader(): HTMLElement {
      return nativeElement.querySelector('.collapsible-header');
    }

    it('should display a collapsible item', async(() => {

      buildComponent<MzCollapsibleItemComponent>(`<mz-collapsible-item>some-text</mz-collapsible-item>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collapsibleItem()).toBeTruthy();
      });
    }));

    describe('body', () => {

      it('should transclude content', async(() => {

        buildComponent<MzCollapsibleItemComponent>(`
          <mz-collapsible-item>
            <mz-collapsible-item-body><p class="some-class-body">some-body</p></mz-collapsible-item-body>
          </mz-collapsible-item>
        `).then((fixture) => {

          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          const transcludeContentBody = collapsibleItemBody().querySelector('p');

          expect(transcludeContentBody).toBeTruthy();
          expect(transcludeContentBody.classList).toContain('some-class-body');
          expect(transcludeContentBody.innerHTML.trim()).toBe('some-body');
          expect(collapsibleItemBody().parentElement.nodeName).toBe(collapsibleItem().nodeName);
        });
      }));
    });

    describe('header', () => {

      it('should have active class when active property is provided', async(() => {

        buildComponent<MzCollapsibleItemComponent>(`<mz-collapsible-item [active]="'true'"></mz-collapsible-item>`).then((fixture) => {

          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          expect(collapsibleItemHeader().classList).toContain('active');
        });
      }));

      it('should not have active class when active property is not provided', async(() => {

        buildComponent<MzCollapsibleItemComponent>(`<mz-collapsible-item></mz-collapsible-item>`).then((fixture) => {

          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          expect(collapsibleItemHeader().classList).not.toContain('active');
        });
      }));

      it('should transclude content', async(() => {

        buildComponent<MzCollapsibleItemComponent>(`
          <mz-collapsible-item>
            <mz-collapsible-item-header><span class="some-class-header">some-header</span></mz-collapsible-item-header>
          </mz-collapsible-item>
        `).then((fixture) => {

          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          const transcludeContentHeader = collapsibleItemHeader().querySelector('span');

          expect(transcludeContentHeader).toBeTruthy();
          expect(transcludeContentHeader.classList).toContain('some-class-header');
          expect(transcludeContentHeader.innerHTML.trim()).toBe('some-header');
          expect(collapsibleItemHeader().parentElement.nodeName).toBe(collapsibleItem().nodeName);
        });
      }));
    });
  });
});
