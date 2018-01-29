import { async, TestBed } from '@angular/core/testing';

import { MzIconMdiModule } from 'app/icon-mdi/icon-mdi.module';
import { buildComponent, MzTestWrapperComponent } from 'app/shared/test-wrapper';
import { MzPaginationPageButtonComponent } from './pagination-page-button/pagination-page-button.component';
import { MzPaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MzIconMdiModule,
      ],
      declarations: [
        MzPaginationComponent,
        MzPaginationPageButtonComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  fdescribe('pagignation', () => {

    function paginationPageButton(): HTMLDivElement[] {
      return nativeElement.querySelectorAll('mz-pagination-page-button li');
    }

    it('should display 2 pages', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totaltItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(paginationPageButton()[0].querySelector('i').classList).toContain('mdi-chevron-left');
        expect(paginationPageButton()[1].querySelector('a').innerHTML).toBe('1');
        expect(paginationPageButton()[2].querySelector('a').innerHTML).toBe('2');
        expect(paginationPageButton()[3].querySelector('i').classList).toContain('mdi-chevron-right');
      });
    }));

    it('should display page 1 as active', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totaltItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(paginationPageButton()[1].classList).toContain('active');
      });
    }));

    it('should display page 2 as active', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [currentPage]="2"
          [itemsPerPage]="10"
          [totaltItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(paginationPageButton()[2].classList).toContain('active');
      });
    }));

    it('should disable previous page button when first page is active', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totaltItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(paginationPageButton()[0].classList).toContain('disabled');
      });
    }));

    it('should active page 2 when page 2 is clicked', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totaltItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        paginationPageButton()[2].querySelector('a').click();
        fixture.detectChanges();

        expect(paginationPageButton()[2].classList).toContain('active');
      });
    }));

    it('should active page 2 when next page button is clicked and page 1 button contain wave-effect', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totaltItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        paginationPageButton()[3].querySelector('a').click();
        fixture.detectChanges();

        expect(paginationPageButton()[1].classList).toContain('waves-effect');
        expect(paginationPageButton()[2].classList).toContain('active');
      });
    }));

    it('should disable next page button when last page is active', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totaltItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        paginationPageButton()[3].querySelector('a').click();
        fixture.detectChanges();

        expect(paginationPageButton()[2].classList).toContain('active');
        expect(paginationPageButton()[3].classList).toContain('disabled');
      });
    }));

    it('should emit changePageEvent when page button is clicked', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totaltItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        const component = <MzPaginationComponent>fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component.changePageEvent, 'emit').and.callThrough();

        paginationPageButton()[3].querySelector('a').click();
        fixture.detectChanges();

        expect(component.changePageEvent.emit).toHaveBeenCalledWith(2);
      });
    }));
  });
});
