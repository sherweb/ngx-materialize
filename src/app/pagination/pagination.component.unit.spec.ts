import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzIconModule } from 'app/icon/icon.module';
import { buildComponent, MzTestWrapperComponent } from 'app/shared/test-wrapper';
import { MzPaginationPageButtonComponent } from './pagination-page-button/pagination-page-button.component';
import { MzPaginationComponent } from './pagination.component';

fdescribe('PaginationComponent:unit', () => {
  let component: MzPaginationComponent;
  let fixture: ComponentFixture<MzPaginationComponent>;
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

  beforeEach(() => {
  });

  describe('pagignation', () => {

    function paginationPageButton(): HTMLDivElement[] {
      return nativeElement.querySelectorAll('mz-pagination-page-button li');
    }

    it('should emit changePageEvent when page button is clicked', async(() => {
      fixture = TestBed.createComponent(MzPaginationComponent);
      nativeElement = fixture.nativeElement;
      component = fixture.componentInstance;

      component.totalItems = 20;
      component.itemsPerPage = 10;

      fixture.detectChanges();

      spyOn(component.changePageEvent, 'emit').and.callThrough();

      paginationPageButton()[2].querySelector('a').click();
      fixture.detectChanges();

      expect(component.changePageEvent.emit).toHaveBeenCalledWith(2);
    }));
  });
});
