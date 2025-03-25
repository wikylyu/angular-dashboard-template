import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { PermissionLabelComponent } from '../permission-label/permission-label.component';
import { PermissionSelectComponent } from '../permission-select/permission-select.component';

@Component({
  selector: 'app-permission-multiple-select',
  imports: [
    PermissionSelectComponent,
    FormsModule,
    PermissionLabelComponent,
    NzListModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './permission-multiple-select.component.html',
  styleUrl: './permission-multiple-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PermissionMultipleSelectComponent),
      multi: true,
    },
  ],
})
export class PermissionMultipleSelectComponent implements ControlValueAccessor {
  permID = 0;
  value: number[] = [];

  onPermissionSelected() {
    if (!this.permID) {
      return;
    }
    if (!this.value.includes(this.permID)) {
      this.value.push(this.permID);
      this.onFormChange(this.value);
    }
  }

  remove(index: number) {
    this.value = this.value.filter((_, i) => i !== index);
    this.onFormChange(this.value);
  }

  writeValue(v: number[] = []) {
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

  disabled = false;
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
