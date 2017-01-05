import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzSidenavDividerComponent } from './sidenav-divider.component';

describe('MzSidenavDividerComponent:unit', () => {
  let component: MzSidenavDividerComponent;
  let fixture: ComponentFixture<MzSidenavDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzSidenavDividerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSidenavDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
