import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzInputContainerComponent } from './input-container.component';

describe('MzInputContainerComponent:unit', () => {
  let component: MzInputContainerComponent;
  let fixture: ComponentFixture<MzInputContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzInputContainerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
