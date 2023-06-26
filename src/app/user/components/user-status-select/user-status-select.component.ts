import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-user-status-select',
  templateUrl: './user-status-select.component.html',
  styleUrls: ['./user-status-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UserStatusSelectComponent,
    },
  ],
})
export class UserStatusSelectComponent implements OnInit, ControlValueAccessor {
  @Input() label = '状态';

  value = '';
  disabled = false;

  constructor(private api: UserApiService, private message: NzMessageService) {}
  ngOnInit(): void {}

  onChange() {
    this.value = this.value || '';
    this.onFormChange(this.value);
  }

  onFormChange = (v: any) => {};

  writeValue(v: any) {
    this.value = v;
  }

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
