import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzSelectContainerComponent } from './select-container.component';

describe('MzSelectContainerComponent:unit', () => {
  let component: MzSelectContainerComponent;
  let fixture: ComponentFixture<MzSelectContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzSelectContainerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSelectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
