import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs/Subscription';

import { MzSelectDirective } from '../select.directive';
import { MzSelectContainerComponent } from './select-container.component';

describe('MzSelectContainerComponent:unit', () => {
  let component: MzSelectContainerComponent;
  let fixture: ComponentFixture<MzSelectContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzSelectContainerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSelectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnDestroy', () => {

    it('should remove subscriptions correctly', () => {
      const mockSelectDirective = <MzSelectDirective>{
        onUpdate: new EventEmitter(),
        inputElement: { off: () => null },
      };

      const mockStatusChangesSubscription = new Subscription();
      const mockSelectValueSubscription = new Subscription();

      component.mzSelectDirective = mockSelectDirective;
      component.statusChangesSubscription = mockStatusChangesSubscription;
      component.selectValueSubscription = mockSelectValueSubscription;

      spyOn(mockSelectDirective.inputElement, 'off');

      component.ngOnDestroy();

      expect(mockSelectDirective.onUpdate.closed).toBeTruthy();
      expect(mockSelectDirective.inputElement.off).toHaveBeenCalled();

      expect(component.statusChangesSubscription.closed).toBeTruthy();
      expect(component.selectValueSubscription.closed).toBeTruthy();
    });
  });
});
