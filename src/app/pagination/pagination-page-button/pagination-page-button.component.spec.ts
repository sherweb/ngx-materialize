import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from 'app/shared/test-wrapper';
import { MzPaginationPageComponent } from './pagination-page.component';

describe('PaginationPageComponent', () => {
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzPaginationPageComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('pagignation page', () => {
    function paginationPage(): HTMLDivElement {
      return nativeElement.querySelector('li');
    }

    it('should transclude content', async(() => {

      buildComponent(`
        <mz-pagination-page>1</mz-pagination-page>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludePagiginationPage = paginationPage();

        expect(transcludePagiginationPage).toBeTruthy();
        expect(transcludePagiginationPage.classList).toContain('waves-effect');
        expect(transcludePagiginationPage.innerHTML.trim()).toBe('1');
      });
    }));

    it('should be active when active attribute is true', async(() => {

      buildComponent(`
        <mz-pagination-page [active]="'true'">1</mz-pagination-page>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludePagiginationPage = paginationPage();

        expect(transcludePagiginationPage).toBeTruthy();
        expect(transcludePagiginationPage.classList).toContain('active');
        expect(transcludePagiginationPage.classList).not.toContain('wave-effect');
      });
    }));

    it('should be disabled when disabled attribute is true', async(() => {

      buildComponent(`
        <mz-pagination-page [disabled]="'true'">1</mz-pagination-page>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludePagiginationPage = paginationPage();

        expect(transcludePagiginationPage).toBeTruthy();
        expect(transcludePagiginationPage.classList).toContain('disabled');
        expect(transcludePagiginationPage.classList).not.toContain('wave-effect');
      });
    }));
  });
});
