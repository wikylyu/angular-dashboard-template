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
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Endpoint } from '../../../models/system';
import { SystemApiService } from '../../../services/apis/system-api.service';

@Component({
  selector: 'app-endpoint-path-select',
  imports: [NzSelectModule, FormsModule],
  templateUrl: './endpoint-path-select.component.html',
  styleUrl: './endpoint-path-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EndpointPathSelectComponent),
      multi: true,
    },
  ],
})
export class EndpointPathSelectComponent
  implements ControlValueAccessor, OnChanges
{
  value: string = '';
  items: Endpoint[] = [];
  @Input({}) method: string = '';
  constructor(private systemApi: SystemApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['method']) {
      this.value = '';
      this.onChange('');
      this.search('');
    }
  }

  loading: boolean = false;
  async search(q: string) {
    try {
      this.loading = true;
      this.items = await this.systemApi.findEndpoints({
        path: q,
        method: this.method,
      });
    } catch (error) {
    } finally {
      this.loading = false;
    }
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
