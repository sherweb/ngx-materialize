/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MzInputContainerComponent } from './input-container.component';

describe('InputContainerComponent:unit', () => {
  let component: MzInputContainerComponent;
  let fixture: ComponentFixture<InputContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzInputContainerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});