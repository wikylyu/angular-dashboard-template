import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AdminUserStatus } from '../../../models/admin';
import { AdminUserStatusNamePipe } from '../../../pipes/admin/admin-user-status-name.pipe';

@Component({
  selector: 'app-admin-user-status-select',
  imports: [NzSelectModule, FormsModule, AdminUserStatusNamePipe],
  templateUrl: './admin-user-status-select.component.html',
  styleUrl: './admin-user-status-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminUserStatusSelectComponent),
      multi: true,
    },
  ],
})
export class AdminUserStatusSelectComponent implements ControlValueAccessor {
  value: string = '';

  statuses: AdminUserStatus[] = [
    AdminUserStatus.ACTIVE,
    AdminUserStatus.BANNED,
  ];

  onChange: (value: AdminUserStatus) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(value: AdminUserStatus): void {
    this.value = value || ''; // 外部通过 ngModel 设置值时调用
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn; // 注册外部的变更回调
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn; // 注册外部的触摸回调
  }

  // 可选：禁用组件
  setDisabledState?(isDisabled: boolean): void {
    // 这里可以添加禁用逻辑，例如禁用 input 元素
  }
}
