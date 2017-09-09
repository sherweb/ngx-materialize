/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MzTabItemComponent } from './tab-item.component';

describe('TabItemComponent', () => {
  let component: MzTabItemComponent;
  let fixture: ComponentFixture<MzTabItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzTabItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzTabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
