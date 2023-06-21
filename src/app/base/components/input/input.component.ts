import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() type = 'text';
  @Input() width = 'auto';
  @Input() after = '';
  @Input() options: string[] = [];

  value = '';

  @Output() enter = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onChange() {
    this.value = this.value || '';
    // this.valueChange.emit(this.value);
    this.onFormChange(this.value);
  }

  keyEnter() {
    this.enter.emit(null);
  }

  writeValue(v: any) {
    this.value = v;
  }

  onFormChange = (v: any) => {};

  onFormTouched = () => {};

  registerOnChange(onChange: any) {
    this.onFormChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onFormTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  passwordVisible = false;
}
