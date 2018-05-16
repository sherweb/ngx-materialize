import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzNavbarItemContainerComponent } from './navbar-item-container.component';

describe('MzNavbarItemContainerComponent:unit', () => {
  let component: MzNavbarItemContainerComponent;
  let fixture: ComponentFixture<MzNavbarItemContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzNavbarItemContainerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzNavbarItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
