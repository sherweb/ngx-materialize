import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzIconComponent } from './icon.component';

describe('IconComponent:unit', () => {
  let component: MzIconComponent;
  let fixture: ComponentFixture<MzIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzIconComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
