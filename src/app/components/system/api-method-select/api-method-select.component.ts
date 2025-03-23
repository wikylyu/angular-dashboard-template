import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-api-method-select',
  imports: [NzSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './api-method-select.component.html',
  styleUrl: './api-method-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ApiMethodSelectComponent),
      multi: true,
    },
  ],
})
export class ApiMethodSelectComponent implements ControlValueAccessor {
  methods: string[] = ['GET', 'POST', 'PUT', 'DELETE'];
  value: string = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(value: string): void {
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
