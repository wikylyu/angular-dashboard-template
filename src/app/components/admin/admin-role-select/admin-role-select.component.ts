import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AdminRole } from '../../../models/admin';
import { AdminApiService } from '../../../services/apis/admin-api.service';

@Component({
  selector: 'app-admin-role-select',
  imports: [NzSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-role-select.component.html',
  styleUrl: './admin-role-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminRoleSelectComponent),
      multi: true,
    },
  ],
})
export class AdminRoleSelectComponent implements ControlValueAccessor {
  value: number[] = [];
  constructor(private adminApi: AdminApiService) {}

  loading: boolean = false;
  items: AdminRole[] = [];
  async search(q: string) {
    try {
      this.loading = true;
      const r = await this.adminApi.findAdminRoles({
        query: q,
        page: 1,
        page_size: 20,
      });
      this.items = r.items;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  async getAdminRole(id: number) {
    try {
      const r = await this.adminApi.getAdminRole(id);
      for (const item of this.items) {
        if (item.id === r.id) {
          return;
        }
      }
      this.items.push(r);
    } catch (error) {}
  }

  onChange: (value: number[]) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(value: number[]): void {
    this.value = value || []; // 外部通过 ngModel 设置值时调用
    for (const role_id of this.value) {
      if (this.items.findIndex((item) => item.id === role_id) !== -1) {
        continue;
      }
      this.getAdminRole(role_id);
    }
  }

  registerOnChange(fn: (value: number[]) => void): void {
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
