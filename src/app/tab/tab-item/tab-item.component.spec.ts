/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabItemComponent } from './tab-item.component';

describe('TabItemComponent', () => {
  let component: TabItemComponent;
  let fixture: ComponentFixture<TabItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
