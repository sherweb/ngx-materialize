import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzDropdownDividerComponent } from './dropdown-divider.component';

describe('MzDropdownDividerComponent:unit', () => {
  let component: MzDropdownDividerComponent;
  let fixture: ComponentFixture<MzDropdownDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzDropdownDividerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzDropdownDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
