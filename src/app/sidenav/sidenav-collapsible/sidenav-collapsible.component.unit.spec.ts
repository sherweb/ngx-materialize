import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzSidenavCollapsibleComponent } from './sidenav-collapsible.component';

describe('MzSidenavCollapsibleComponent:unit', () => {
  let component: MzSidenavCollapsibleComponent;
  let fixture: ComponentFixture<MzSidenavCollapsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzSidenavCollapsibleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSidenavCollapsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
