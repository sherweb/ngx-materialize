import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBindingComponent } from './form-binding.component';

describe('FormBindingComponent:unit', () => {
  let component: FormBindingComponent;
  let fixture: ComponentFixture<FormBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});