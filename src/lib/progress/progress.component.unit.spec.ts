import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzProgressComponent } from './progress.component';

describe('MzProgressComponent:unit', () => {
  let component: MzProgressComponent;
  let fixture: ComponentFixture<MzProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzProgressComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
