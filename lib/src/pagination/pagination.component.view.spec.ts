import { async, TestBed } from '@angular/core/testing';

import { MzIconModule } from '../icon/icon.module';
import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzPaginationPageButtonComponent } from './pagination-page-button/pagination-page-button.component';
import { MzPaginationComponent } from './pagination.component';

describe('MzPaginationComponent:view', () => {
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MzIconModule,
      ],
      declarations: [
        MzPaginationComponent,
        MzPaginationPageButtonComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('pagignation', () => {

    function paginationPageButtons(): HTMLDivElement[] {
      return nativeElement.querySelectorAll('mz-pagination-page-button li');
    }

    it('should display 2 pages', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totalItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const paginationPageButtonArray = paginationPageButtons();

        expect(paginationPageButtonArray[0].querySelector('i').innerHTML).toBe('chevron_left');
        expect(paginationPageButtonArray[1].querySelector('a').innerHTML).toBe('1');
        expect(paginationPageButtonArray[2].querySelector('a').innerHTML).toBe('2');
        expect(paginationPageButtonArray[3].querySelector('i').innerHTML).toBe('chevron_right');
      });
    }));

    it('should display page 1 as active', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totalItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(paginationPageButtons()[1].classList).toContain('active');
      });
    }));

    it('should display page 2 as active', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [currentPage]="2"
          [itemsPerPage]="10"
          [totalItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(paginationPageButtons()[2].classList).toContain('active');
      });
    }));

    it('should disable previous page button when first page is active', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totalItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(paginationPageButtons()[0].classList).toContain('disabled');
      });
    }));

    it('should active page 2 when page 2 is clicked', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totalItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        paginationPageButtons()[2].querySelector('a').click();
        fixture.detectChanges();

        expect(paginationPageButtons()[2].classList).toContain('active');
      });
    }));

    it('should active first page when first button is clicked', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [enableFirstAndLastPageButtons]="true"
          [itemsPerPage]="10"
          [totalItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        paginationPageButtons()[3].querySelector('a').click();
        fixture.detectChanges();

        paginationPageButtons()[0].querySelector('a').click();
        fixture.detectChanges();

        expect(paginationPageButtons()[2].classList).toContain('active');
      });
    }));

    it('should active last page when last button is clicked', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [enableFirstAndLastPageButtons]="true"
          [itemsPerPage]="10"
          [totalItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        paginationPageButtons()[5].querySelector('a').click();
        fixture.detectChanges();

        expect(paginationPageButtons()[3].classList).toContain('active');
      });
    }));

    it('should active page 2 when next page button is clicked and page 1 button contain wave-effect', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totalItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const paginationPageButtonArray = paginationPageButtons();

        paginationPageButtonArray[3].querySelector('a').click();
        fixture.detectChanges();

        expect(paginationPageButtonArray[1].classList).toContain('waves-effect');
        expect(paginationPageButtonArray[2].classList).toContain('active');
      });
    }));

    it('should disable next page button when last page is active', async(() => {

      buildComponent(`
        <mz-pagination class="col s12 m4"
          [itemsPerPage]="10"
          [totalItems]="20"
        >
        </mz-pagination>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const paginationPageButtonArray = paginationPageButtons();

        paginationPageButtonArray[2].querySelector('a').click();
        fixture.detectChanges();

        expect(paginationPageButtonArray[2].classList).toContain('active');
        expect(paginationPageButtonArray[3].classList).toContain('disabled');
      });
    }));

    describe('renderButtons', () => {
      it('should show 5 pages button when maxPageButtons is not defined', async(() => {

        buildComponent(`
          <mz-pagination class="col s12 m4"
            [itemsPerPage]="10"
            [totalItems]="100"
          >
          </mz-pagination>
        `).then((fixture) => {
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          const paginationPageButtonArray = paginationPageButtons();

          for (let i = 1; i <= 5; i++) {
            expect(paginationPageButtonArray[i].querySelector('a').innerHTML).toBe(i.toString());
          }
          expect(paginationPageButtonArray.length).toBe(7);
        });
      }));

      it('should show 10 pages button when maxPageButtons is defined to 10', async(() => {

        buildComponent(`
          <mz-pagination class="col s12 m4"
            [itemsPerPage]="10"
            [maxPageButtons]="10"
            [totalItems]="100"
          >
          </mz-pagination>
        `).then((fixture) => {
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          const paginationPageButtonArray = paginationPageButtons();

          for (let i = 1; i <= 10; i++) {
            expect(paginationPageButtonArray[i].querySelector('a').innerHTML).toBe(i.toString());
          }
          expect(paginationPageButtonArray.length).toBe(12);
        });
      }));

      it('should show page 3, 4, 5, 6 and 7 when current page is 5', async(() => {

        buildComponent(`
          <mz-pagination class="col s12 m4"
            [currentPage]="5"
            [itemsPerPage]="10"
            [totalItems]="100"
          >
          </mz-pagination>
        `).then((fixture) => {
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          const paginationPageButtonArray = paginationPageButtons();

          for (let i = 1; i <= 5; i++) {
            expect(paginationPageButtonArray[i].querySelector('a').innerHTML).toBe((i + 2).toString());
          }
          expect(paginationPageButtonArray.length).toBe(7);
        });
      }));

      it('should show page 1, 2, 3, 4 and 5 when current page is 1', async(() => {

        buildComponent(`
          <mz-pagination class="col s12 m4"
            [itemsPerPage]="10"
            [totalItems]="100"
          >
          </mz-pagination>
        `).then((fixture) => {
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          const paginationPageButtonArray = paginationPageButtons();

          for (let i = 1; i <= 5; i++) {
            expect(paginationPageButtonArray[i].querySelector('a').innerHTML).toBe((i).toString());
          }
          expect(paginationPageButtonArray.length).toBe(7);
        });
      }));

      it('should show page 6, 7, 8, 9 and 10 when current page is 10', async(() => {

        buildComponent(`
          <mz-pagination class="col s12 m4"
            [currentPage]="10"
            [itemsPerPage]="10"
            [totalItems]="100"
          >
          </mz-pagination>
        `).then((fixture) => {
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          const paginationPageButtonArray = paginationPageButtons();

          for (let i = 1; i <= 5; i++) {
            expect(paginationPageButtonArray[i].querySelector('a').innerHTML).toBe((i + 5).toString());
          }
          expect(paginationPageButtonArray.length).toBe(7);
        });
      }));

      it('should go to page 1 when current page is 6 and the total item is change to 50', async(() => {

        buildComponent(`
          <mz-pagination class="col s12 m4"
            [currentPage]="6"
            [itemsPerPage]="10"
            [totalItems]="50"
          >
          </mz-pagination>
        `).then((fixture) => {
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          const paginationPageButtonArray = paginationPageButtons();

          expect(paginationPageButtons()[1].classList).toContain('active');
        });
      }));
    });
  });
});
