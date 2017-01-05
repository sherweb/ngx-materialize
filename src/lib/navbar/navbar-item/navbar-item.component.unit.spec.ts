import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzNavbarItemComponent } from './navbar-item.component';

describe('MzNavbarItemComponent:unit', () => {
  let component: MzNavbarItemComponent;
  let fixture: ComponentFixture<MzNavbarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzNavbarItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzNavbarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
