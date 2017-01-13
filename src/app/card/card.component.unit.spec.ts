import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCardComponent } from './card.component';

describe('MzCardComponent:unit', () => {
  let component: MzCardComponent;
  let fixture: ComponentFixture<MzCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
