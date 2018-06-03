import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzNavbarComponent } from './navbar.component';

describe('MzNavbarComponent:unit', () => {
  let component: MzNavbarComponent;
  let fixture: ComponentFixture<MzNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzNavbarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
