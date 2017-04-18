import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCollapsibleItemComponent } from './collapsible-item.component';

describe('MzCollapsibleItemComponent:unit', () => {
  let component: MzCollapsibleItemComponent;
  let fixture: ComponentFixture<MzCollapsibleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzCollapsibleItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCollapsibleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {

    it('should set innerHTML with the native element', () => {

      component.ngAfterViewInit();
      const resultInnerHTML = component.sanitizer.bypassSecurityTrustHtml(component.element.nativeElement.innerHTML).toString();
      expect(component.innerHTML.toString()).toBe(resultInnerHTML);
    });
  });
});
