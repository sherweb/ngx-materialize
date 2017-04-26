import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCollapsibleItemComponent } from './collapsible-item.component';

describe('MzCollapsibleItemComponent:unit', () => {
  let component: MzCollapsibleItemComponent;
  let fixture: ComponentFixture<MzCollapsibleItemComponent>;

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
});
