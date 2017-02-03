import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzBadgeComponent } from './badge.component';

describe('MzBadgeComponent:unit', () => {
  let component: MzBadgeComponent;
  let fixture: ComponentFixture<MzBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzBadgeComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
