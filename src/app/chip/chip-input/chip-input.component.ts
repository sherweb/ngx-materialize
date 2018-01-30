import { Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mz-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MzChipInputComponent),
      multi: true,
    },
  ],
})
export class MzChipInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() autocompleteOptions?: Materialize.AutoCompleteOptions;
  @Input() placeholder?: string;
  @Input() secondaryPlaceholder?: string;

  @Output() add = new EventEmitter<Materialize.ChipDataObject>();
  @Output() delete = new EventEmitter<Materialize.ChipDataObject>();
  @Output() select = new EventEmitter<Materialize.ChipDataObject>();

  get value(): Materialize.ChipDataObject[] {
    return this.chipsElement.material_chip('data') as Materialize.ChipDataObject[];
  }

  private chipsElement: JQuery;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.initElements();
    this.initMaterializeChip();
  }

  ngOnDestroy() {
    this.chipsElement
      .off('chip.add')
      .off('chip.delete')
      .off('chip.select');
  }

  initElements() {
    this.chipsElement = $(this.elementRef.nativeElement);
  }

  initMaterializeChip(value?: Materialize.ChipDataObject[]) {
    this.chipsElement.material_chip({
      data: value || this.value,
      placeholder: this.placeholder,
      secondaryPlaceholder: this.secondaryPlaceholder,
      autocompleteOptions: this.autocompleteOptions,
    });

    this.chipsElement
      .on('chip.add', (event, chip: Materialize.ChipDataObject) => {
        this.onChange(this.value);
        this.add.emit(chip);
      })
      .on('chip.delete', (event, chip: Materialize.ChipDataObject) => {
        this.onChange(this.value);
        this.delete.emit(chip);
      })
      .on('chip.select', (event, chip: Materialize.ChipDataObject) => {
        this.select.emit(chip);
      });
  }

  onChange(value: Materialize.ChipDataObject[]) { };

  //#region ControlValueAccessor

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) { }

  setDisabledState(isDisabled: boolean) { }

  writeValue(value: Materialize.ChipDataObject[]) {
    if (value) {
      this.initMaterializeChip(value);
    }
  }

  //#endregion ControlValueAccessor
}
