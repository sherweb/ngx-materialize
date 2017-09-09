import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzSwitchContainerComponent } from './switch-container.component';

describe('MzSwitchContainerComponent:view', () => {
  let component: MzSwitchContainerComponent;
  let fixture: ComponentFixture<MzSwitchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzSwitchContainerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSwitchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
