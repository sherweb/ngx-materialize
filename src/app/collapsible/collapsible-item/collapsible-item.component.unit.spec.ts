/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MzCollapsibleItemComponent } from './collapsible-item.component';

describe('MzCollapsibleItemComponent:unit', () => {
  let component: MzCollapsibleItemComponent;
  let fixture: ComponentFixture<CollapsibleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzCollapsibleItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCollapsibleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {

    it('should set innerHTML with the native element', () => {

      component.ngAfterViewInit();

      expect(component.innerHTML).toBe(component.element.nativeElement.innerHTML);
    });
  });
});
