import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzTextareaContainerComponent } from './textarea-container.component';

describe('MzTextareaContainerComponent:unit', () => {
  let component: MzTextareaContainerComponent;
  let fixture: ComponentFixture<MzTextareaContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzTextareaContainerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzTextareaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
