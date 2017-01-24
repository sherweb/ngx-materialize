import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzRadioButtonContainerComponent } from './radio-button-container.component';

describe('MzRadioButtonContainerComponent:unit', () => {
  let component: MzRadioButtonContainerComponent;
  let fixture: ComponentFixture<MzRadioButtonContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzRadioButtonContainerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzRadioButtonContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
