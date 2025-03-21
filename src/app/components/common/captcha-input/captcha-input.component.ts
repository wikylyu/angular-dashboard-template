import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-captcha-input',
  imports: [NgOptimizedImage, NzInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './captcha-input.component.html',
  styleUrl: './captcha-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CaptchaInputComponent),
      multi: true,
    },
  ],
})
export class CaptchaInputComponent implements ControlValueAccessor, OnChanges {
  @Input({ required: true }) captchaUrl: string = '';
  value: string = '';

  @Input()
  t: Date = new Date();

  @Input() large: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['t']) {
      this.startInterval();
    }
  }

  interval: any = null;

  startInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.t = new Date();
    }, 1000 * 60 * 4.5);
  }

  get src() {
    return this.captchaUrl + '?t=' + this.t.toISOString();
  }

  refresh() {
    this.t = new Date();
    this.startInterval();
  }

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
