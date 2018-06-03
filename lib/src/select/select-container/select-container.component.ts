import { AfterViewInit, Component, ContentChild, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MzValidationComponent } from '../../validation/validation.component';
import { MzSelectDirective } from '../select.directive';

@Component({
  selector: 'mz-select-container',
  templateUrl: './select-container.component.html',
  styleUrls: ['./select-container.component.scss'],
})
export class MzSelectContainerComponent implements AfterViewInit, OnDestroy {
  @Input() inline: boolean;

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
        // to synchronize input and select when value changes programmatically
        const isDropdownOpen = this.mzSelectDirective.inputElement.hasClass('active');
        const inputValue = this.mzSelectDirective.inputElement.val();
        const options = this.mzSelectDirective.selectElement.children('option');
        const selectedOptions = options.filter('option:selected').toArray();
        const disabledOptions = options.filter(':disabled').toArray();

        const selectedOptionText = selectedOptions.length === 0
          ? disabledOptions.map(option => option.textContent)[0]
          : selectedOptions.map(option => option.textContent).join(', ');

        if (inputValue !== selectedOptionText && !isDropdownOpen) {
          this.mzSelectDirective.updateMaterialSelect();
        }
      });
    }
  }

  initSelectSubscription() {
    if (this.mzSelectDirective) {
      this.mzSelectDirective.update
        .subscribe(() => this.registerOnBlur())
        .next();
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
      this.mzSelectDirective.update.unsubscribe();
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
