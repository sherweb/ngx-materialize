import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from 'app/shared/test-wrapper';
import { MzPaginationPageComponent } from './pagination-page/pagination-page.component';
import { MzPaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzPaginationComponent,
        MzPaginationPageComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('pagignation', () => {

    function pagination(): HTMLDivElement {
      return nativeElement.querySelector('.pagination');
    }

    function paginationPage(): HTMLDivElement {
      return nativeElement.querySelector('li');
    }

    it('should display a pagination', async(() => {

      buildComponent(`
        <mz-pagination></mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(pagination()).toBeTruthy();
      });
    }));

    it('should transclude pagination page', async(() => {

      buildComponent(`
        <mz-pagination>
          <mz-pagination-page>1</mz-pagination-page>
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludePagiginationPage = paginationPage();

        expect(transcludePagiginationPage).toBeTruthy();
      });
    }));
  });
});
