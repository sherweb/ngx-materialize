import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCheckboxContainerComponent } from './checkbox-container.component';

describe('MzCheckboxContainerComponent:unit', () => {
  let component: MzCheckboxContainerComponent;
  let fixture: ComponentFixture<MzCheckboxContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzCheckboxContainerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCheckboxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
