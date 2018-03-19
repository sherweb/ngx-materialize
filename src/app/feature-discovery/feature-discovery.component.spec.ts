import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzFeatureDiscoveryComponent } from './feature-discovery.component';

describe('MzFeatureDiscoveryComponent:view', () => {
  let component: MzFeatureDiscoveryComponent;
  let fixture: ComponentFixture<MzFeatureDiscoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzFeatureDiscoveryComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzFeatureDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
