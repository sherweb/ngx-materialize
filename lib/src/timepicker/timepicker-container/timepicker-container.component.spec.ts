import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzTimepickerContainerComponent } from './timepicker-container.component';

describe('TimepickerContainerComponent', () => {
  let component: MzTimepickerContainerComponent;
  let fixture: ComponentFixture<MzTimepickerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzTimepickerContainerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzTimepickerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
