import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


import { MzErrorMessageComponent } from './error-message.component';

describe('MzErrorMessageComponent:unit', () => {
  let component: MzErrorMessageComponent;
  let fixture: ComponentFixture<MzErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzErrorMessageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
