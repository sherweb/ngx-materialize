import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzChipInputComponent } from './chip-input.component';

describe('MzChipInputComponent:view', () => {
  let component: MzChipInputComponent;
  let fixture: ComponentFixture<MzChipInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzChipInputComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzChipInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
