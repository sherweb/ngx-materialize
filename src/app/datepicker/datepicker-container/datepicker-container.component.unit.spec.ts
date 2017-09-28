import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzDatepickerContainerComponent } from './datepicker-container.component';

describe('MzDatepickerContainerComponent:unit', () => {
  let component: MzDatepickerContainerComponent;
  let fixture: ComponentFixture<MzDatepickerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzDatepickerContainerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzDatepickerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
