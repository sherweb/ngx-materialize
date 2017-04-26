import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCollectionItemComponent } from './collection-item.component';

describe('MzCollectionItemComponent:unit', () => {
  let component: MzCollectionItemComponent;
  let fixture: ComponentFixture<MzCollectionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzCollectionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCollectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
