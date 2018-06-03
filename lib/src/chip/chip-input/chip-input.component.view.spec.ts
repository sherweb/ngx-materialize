import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzChipInputComponent } from './chip-input.component';

describe('MzChipInputComponent:view', () => {
  let nativeElement: any;

  function chipInput(): HTMLElement {
    return nativeElement.querySelector('mz-chip-input');
  }

  function chipInputValue(): Materialize.ChipDataObject[] {
    return $(chipInput()).material_chip('data') as Materialize.ChipDataObject[];
  }

  function chips(): HTMLElement[] {
    return nativeElement.querySelectorAll('mz-chip-input > .chip');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        MzChipInputComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  it('should initialize chip-input correctly', fakeAsync(() => {

    const autocompleteOptions: Materialize.AutoCompleteOptions = {
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': 'assets/google_g_logo.png',
      },
    };
    const placeholder = 'placeholder-x';
    const secondaryPlaceholder = 'secondary-placeholder-x';

    buildComponent(`
      <mz-chip-input
        [autocompleteOptions]="autocompleteOptions"
        [placeholder]="placeholder"
        [secondaryPlaceholder]="secondaryPlaceholder">
      </mz-chip-input>
    `, {
      autocompleteOptions,
      placeholder,
      secondaryPlaceholder,
    }).then((fixture) => {
      const mockChipsElement = {
        material_chip: jasmine.createSpy('material_chip'),
        off: () => null,
        on: () => null,
      };

      spyOn(window, '$').and.callFake(selector => {
        return selector === chipInput()
          ? mockChipsElement
          : null;
      });

      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
      tick();

      expect(mockChipsElement.material_chip).toHaveBeenCalledTimes(2);
      expect(mockChipsElement.material_chip.calls.argsFor(0)).toEqual(['data']);
      expect(mockChipsElement.material_chip.calls.argsFor(1)).toEqual([{
        autocompleteOptions: autocompleteOptions,
        data: undefined,
        placeholder: placeholder,
        secondaryPlaceholder: secondaryPlaceholder,
      }]);
    });
  }));

  it('should be shown correctly when initialized with values', fakeAsync(() => {

    const value: Materialize.ChipDataObject[] = [
      { tag: 'banana' },
      { tag: 'kiwi' },
      { tag: 'mango' },
    ];

    buildComponent(
      `<mz-chip-input [(ngModel)]="value"></mz-chip-input>`,
      { value },
    ).then((fixture) => {
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
      tick();

      expect(chipInputValue()).toBe(value);
      expect(chips().length).toBe(3);
      expect(chips()[0].childNodes[0].textContent).toBe(value[0].tag);
      expect(chips()[1].childNodes[0].textContent).toBe(value[1].tag);
      expect(chips()[2].childNodes[0].textContent).toBe(value[2].tag);
    });
  }));

  it('should add chip in DOM when model is updated', fakeAsync(() => {

    const value: Materialize.ChipDataObject[] = [
      { tag: 'banana' },
      { tag: 'kiwi' },
      { tag: 'mango' },
    ];

    buildComponent<{ value: Materialize.ChipDataObject[] }>(
      `<mz-chip-input [(ngModel)]="value"></mz-chip-input>`,
      { value },
    ).then((fixture) => {
      const component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
      tick();

      expect(chipInputValue()).toBe(value);
      expect(chips().length).toBe(3);

      component.value = [
        ...component.value,
        { tag: 'strawberry' },
      ];

      fixture.detectChanges();
      tick();

      expect(chipInputValue()).toBe(component.value);
      expect(chips().length).toBe(4);
      expect(chips()[0].childNodes[0].textContent).toBe(component.value[0].tag);
      expect(chips()[1].childNodes[0].textContent).toBe(component.value[1].tag);
      expect(chips()[2].childNodes[0].textContent).toBe(component.value[2].tag);
      expect(chips()[3].childNodes[0].textContent).toBe(component.value[3].tag);
    });
  }));

  it('should remove chip from DOM when model is updated', fakeAsync(() => {

    const value: Materialize.ChipDataObject[] = [
      { tag: 'banana' },
      { tag: 'kiwi' },
      { tag: 'mango' },
    ];

    buildComponent<{ value: Materialize.ChipDataObject[] }>(
      `<mz-chip-input [(ngModel)]="value"></mz-chip-input>`,
      { value },
    ).then((fixture) => {
      const component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
      tick();

      expect(chipInputValue()).toBe(value);
      expect(chips().length).toBe(3);

      component.value.pop();
      component.value = [
        ...component.value,
      ];

      fixture.detectChanges();
      tick();

      expect(chipInputValue()).toBe(component.value);
      expect(chips().length).toBe(2);
      expect(chips()[0].childNodes[0].textContent).toBe(component.value[0].tag);
      expect(chips()[1].childNodes[0].textContent).toBe(component.value[1].tag);
    });
  }));

  it('should emit event correctly when adding a tag', fakeAsync(() => {

    buildComponent<{ onAdd: Function }>(
      `<mz-chip-input (add)="onAdd($event)"></mz-chip-input>`,
      { onAdd: jasmine.createSpy('onAdd') },
    ).then((fixture) => {
      const component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
      tick();

      const mockChip: Materialize.ChipDataObject = { tag: 'chip-x' };
      $(chipInput()).trigger('chip.add', mockChip);

      expect(component.onAdd).toHaveBeenCalledWith(mockChip);
    });
  }));

  it('should emit event correctly when removing a tag', fakeAsync(() => {

    buildComponent<{ onDelete: Function }>(
      `<mz-chip-input (delete)="onDelete($event)"></mz-chip-input>`,
      { onDelete: jasmine.createSpy('onDelete') },
    ).then((fixture) => {
      const component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
      tick();

      const mockChip: Materialize.ChipDataObject = { tag: 'chip-x' };
      $(chipInput()).trigger('chip.delete', mockChip);

      expect(component.onDelete).toHaveBeenCalledWith(mockChip);
    });
  }));

  it('should emit event correctly when selecting a tag', fakeAsync(() => {

    buildComponent<{ onSelect: Function }>(
      `<mz-chip-input (select)="onSelect($event)"></mz-chip-input>`,
      { onSelect: jasmine.createSpy('onSelect') },
    ).then((fixture) => {
      const component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
      tick();

      const mockChip: Materialize.ChipDataObject = { tag: 'chip-x' };
      $(chipInput()).trigger('chip.select', mockChip);

      expect(component.onSelect).toHaveBeenCalledWith(mockChip);
    });
  }));

  it('should remove event listeners when destroyed', fakeAsync(() => {

    buildComponent(
      `<mz-chip-input></mz-chip-input>`,
    ).then((fixture) => {
      const component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
      tick();

      const chipInputEvents = jQuery['_data'](chipInput(), 'events');

      expect(chipInputEvents.chip).toBeDefined();
      expect(chipInputEvents.chip.length).toBe(3);
      expect(chipInputEvents.chip[0].namespace).toBe('add');
      expect(chipInputEvents.chip[1].namespace).toBe('delete');
      expect(chipInputEvents.chip[2].namespace).toBe('select');

      fixture.destroy();

      expect(chipInputEvents.chip).toBeUndefined();
    });
  }));
});
