import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzDropdownItemComponent } from './dropdown-item.component';

describe('MzDropdownItemComponent:unit', () => {
  let component: MzDropdownItemComponent;
  let fixture: ComponentFixture<MzDropdownItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzDropdownItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzDropdownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
