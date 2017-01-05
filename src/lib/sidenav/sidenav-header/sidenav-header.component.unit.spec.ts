import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzSidenavHeaderComponent } from './sidenav-header.component';

describe('MzSidenavHeaderComponent:unit', () => {
  let component: MzSidenavHeaderComponent;
  let fixture: ComponentFixture<MzSidenavHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzSidenavHeaderComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSidenavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
