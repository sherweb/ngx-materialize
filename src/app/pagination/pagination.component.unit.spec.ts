import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzIconModule } from 'app/icon/icon.module';
import { buildComponent, MzTestWrapperComponent } from 'app/shared/test-wrapper';
import { MzPaginationPageButtonComponent } from './pagination-page-button/pagination-page-button.component';
import { MzPaginationComponent } from './pagination.component';

describe('PaginationComponent:unit', () => {
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

    it('should emit changePageEvent when previous button is clicked', async(() => {
      fixture = TestBed.createComponent(MzPaginationComponent);
      nativeElement = fixture.nativeElement;
      component = fixture.componentInstance;

      component.currentPage = 2;
      component.totalItems = 20;
      component.itemsPerPage = 10;

      fixture.detectChanges();

      spyOn(component.changePageEvent, 'emit').and.callThrough();

      paginationPageButton()[0].querySelector('a').click();
      fixture.detectChanges();

      expect(component.changePageEvent.emit).toHaveBeenCalledWith(1);
    }));

    it('should not emit changePageEvent when previous button is clicked and current page is the first one', async(() => {
      fixture = TestBed.createComponent(MzPaginationComponent);
      nativeElement = fixture.nativeElement;
      component = fixture.componentInstance;

      component.totalItems = 20;
      component.itemsPerPage = 10;

      fixture.detectChanges();

      spyOn(component.changePageEvent, 'emit').and.callThrough();

      paginationPageButton()[0].querySelector('a').click();
      fixture.detectChanges();

      expect(component.changePageEvent.emit).not.toHaveBeenCalledWith(1);
    }));

    it('should emit changePageEvent when next button is clicked', async(() => {
      fixture = TestBed.createComponent(MzPaginationComponent);
      nativeElement = fixture.nativeElement;
      component = fixture.componentInstance;

      component.totalItems = 20;
      component.itemsPerPage = 10;

      fixture.detectChanges();

      spyOn(component.changePageEvent, 'emit').and.callThrough();

      paginationPageButton()[3].querySelector('a').click();
      fixture.detectChanges();

      expect(component.changePageEvent.emit).toHaveBeenCalledWith(2);
    }));

    it('should not emit changePageEvent when next button is clicked and current page is the last one', async(() => {
      fixture = TestBed.createComponent(MzPaginationComponent);
      nativeElement = fixture.nativeElement;
      component = fixture.componentInstance;

      component.currentPage = 2
      component.totalItems = 20;
      component.itemsPerPage = 10;

      fixture.detectChanges();

      spyOn(component.changePageEvent, 'emit').and.callThrough();

      paginationPageButton()[3].querySelector('a').click();
      fixture.detectChanges();

      expect(component.changePageEvent.emit).not.toHaveBeenCalledWith(2);
    }))
  });
});
