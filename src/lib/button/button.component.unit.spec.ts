import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzButtonComponent } from './button.component';

describe('MzButtonComponent:unit', () => {
  let component: MzButtonComponent;
  let fixture: ComponentFixture<MzButtonComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzButtonComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzButtonComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleClick', () => {

    it('should emit step on click', () => {

      const mockEvent = <Event>{ timeStamp: 1234 };

      spyOn(component.onClick, 'emit');

      component.handleClick(mockEvent);

      expect(component.onClick.emit).toHaveBeenCalledWith(mockEvent);
    });
  });
});
