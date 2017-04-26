import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCollectionHeaderComponent } from './collection-header.component';

describe('MzCollectionHeaderComponent:unit', () => {
  let component: MzCollectionHeaderComponent;
  let fixture: ComponentFixture<MzCollectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzCollectionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCollectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
