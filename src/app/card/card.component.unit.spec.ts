import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCardComponent } from './card.component';

describe('MzCardComponent:unit', () => {
  let component: MzCardComponent;
  let fixture: ComponentFixture<MzCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isElementDisplayed', () => {
    it('should return false when element is null or undefined', () => {
      let element: HTMLElement = null;

      expect(component['isElementDisplayed'](element)).toBeFalsy();

      element = undefined;

      expect(component['isElementDisplayed'](element)).toBeFalsy();

    });

    it('should return false when element is defined and its inner HTML is empty', () => {
      const element: HTMLElement = document.createElement('div');

      expect(component['isElementDisplayed'](element)).toBeFalsy();
    });

    it('should return true when element is defined and its inner HTML is not empty', () => {
      const element: HTMLElement = document.createElement('div');

      element.innerHTML = 'test'

      expect(component['isElementDisplayed'](element)).toBeTruthy();
    });
  });
});
