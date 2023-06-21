import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-admin-staff-token-status-select',
  templateUrl: './admin-staff-token-status-select.component.html',
  styleUrls: ['./admin-staff-token-status-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AdminStaffTokenStatusSelectComponent,
    },
  ],
})
export class AdminStaffTokenStatusSelectComponent
  implements ControlValueAccessor
{
  value = '';
  disabled = false;
  @Input() label = '状态';

  onChange() {
    this.value = this.value || '';
    this.onFormChange(this.value);
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
}
