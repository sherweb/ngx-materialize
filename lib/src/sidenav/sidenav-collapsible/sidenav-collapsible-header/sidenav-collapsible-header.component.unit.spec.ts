import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzSidenavCollapsibleHeaderComponent } from './sidenav-collapsible-header.component';

describe('MzSidenavCollapsibleHeaderComponent:unit', () => {
  let component: MzSidenavCollapsibleHeaderComponent;
  let fixture: ComponentFixture<MzSidenavCollapsibleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzSidenavCollapsibleHeaderComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSidenavCollapsibleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
