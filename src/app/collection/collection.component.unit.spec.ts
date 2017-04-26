import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCollectionComponent } from './collection.component';

describe('MzCollectionComponent:unit', () => {
  let component: MzCollectionComponent;
  let fixture: ComponentFixture<MzCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
