import { AfterViewInit, Component, ContentChild, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { MzValidationComponent } from '../../validation/validation.component';
import { MzSelectDirective } from '../select.directive';

@Component({
  selector: 'mz-select-container',
  templateUrl: './select-container.component.html',
  styleUrls: ['./select-container.component.scss'],
})
export class MzSelectContainerComponent implements AfterViewInit, OnDestroy {
  @ContentChild(MzSelectDirective) mzSelectDirective: MzSelectDirective;
  @ContentChild(MzValidationComponent) mzValidationComponent: MzValidationComponent;
  @ContentChild(NgControl) ngControl: NgControl;

  selectValueSubscription: Subscription;
  statusChangesSubscription: Subscription;

  ngAfterViewInit() {
    this.initControlSubscription();
    this.initSelectSubscription();
  }

  ngOnDestroy() {
    this.removeControlSubscription();
    this.removeSelectSubscription();
  }

  initControlSubscription() {
    if (this.ngControl) {
      this.mzSelectDirective.disabled = this.ngControl.control.disabled;

      this.statusChangesSubscription = this.ngControl.control.statusChanges.subscribe((status: string) => {
        // to handle enabling/disabling formControl
        const disabled = status === 'DISABLED';
        if (disabled !== this.mzSelectDirective.disabled) {
          this.mzSelectDirective.disabled = disabled;
          this.mzSelectDirective.handleDisabled();
        }
      });

      this.selectValueSubscription = this.ngControl.valueChanges.subscribe((value: any) => {
        const inputValue = this.mzSelectDirective.inputElement.val();
        const selectedOptionText = this.mzSelectDirective.selectElement
          .children('option:selected')
          .text();

        // synchronize input and select when value changes programmatically
        if (inputValue !== selectedOptionText) {
          this.mzSelectDirective.inputElement.val(selectedOptionText);

          const dropdownOptions = this.mzSelectDirective.inputElement
            .siblings('ul.dropdown-content')
            .children('li');

          dropdownOptions
            .removeClass('active selected');

          dropdownOptions
            .filter((index, element: HTMLLIElement) => element.textContent === selectedOptionText)
            .filter((index, element: HTMLLIElement) => !element.classList.contains('disabled'))
            .addClass('active');

          if (this.mzValidationComponent) {
            this.mzValidationComponent.setValidationState();
          }
        }
      });
    }
  }

  initSelectSubscription() {
    if (this.mzSelectDirective) {
      this.mzSelectDirective.onUpdate.subscribe(() => this.registerOnBlur());
      this.registerOnBlur();
    }
  }

  registerOnBlur() {
    this.mzSelectDirective.inputElement.on('blur', () => {
      if (this.ngControl) {
        this.ngControl.control.markAsTouched();
      }
      if (this.mzValidationComponent) {
        this.mzValidationComponent.setValidationState();
      }
    });
  }

  removeControlSubscription() {
    if (this.mzSelectDirective) {
      this.mzSelectDirective.onUpdate.unsubscribe();
      this.mzSelectDirective.inputElement.off();
    }
  }

  removeSelectSubscription() {
    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }
    if (this.selectValueSubscription) {
      this.selectValueSubscription.unsubscribe();
    }
  }
}
