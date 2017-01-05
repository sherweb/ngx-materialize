import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxComponent } from './parallax.component';

describe('ParallaxComponent:unit', () => {
  let component: ParallaxComponent;
  let fixture: ComponentFixture<ParallaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
