import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzChipComponent } from './chip.component';

describe('MzChipComponent:view', () => {
  let component: MzChipComponent;
  let fixture: ComponentFixture<MzChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzChipComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
