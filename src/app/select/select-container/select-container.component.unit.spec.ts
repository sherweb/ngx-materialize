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
        onUpdate: { unsubscribe: () => null },
        inputElement: { off: () => null },
      };

      const mockStatusChangesSubscription = <Subscription>{
        unsubscribe: () => null,
      };

      const mockSelectValueSubscription = <Subscription>{
        unsubscribe: () => null,
      };

      component.mzSelectDirective = mockSelectDirective;
      component.statusChangesSubscription = mockStatusChangesSubscription;
      component.selectValueSubscription = mockSelectValueSubscription;

      spyOn(mockSelectDirective.onUpdate, 'unsubscribe');
      spyOn(mockSelectDirective.inputElement, 'off');

      spyOn(component.statusChangesSubscription, 'unsubscribe');
      spyOn(component.selectValueSubscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(mockSelectDirective.onUpdate.unsubscribe).toHaveBeenCalled();
      expect(mockSelectDirective.inputElement.off).toHaveBeenCalled();

      expect(component.statusChangesSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.selectValueSubscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
