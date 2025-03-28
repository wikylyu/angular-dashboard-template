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
import { Route } from '../../../models/system';
import { SystemApiService } from '../../../services/apis/system-api.service';

@Component({
  selector: 'app-route-path-select',
  imports: [NzSelectModule, FormsModule],
  templateUrl: './route-path-select.component.html',
  styleUrl: './route-path-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoutePathSelectComponent),
      multi: true,
    },
  ],
})
export class RoutePathSelectComponent
  implements ControlValueAccessor, OnChanges
{
  value: string = '';
  items: Route[] = [];
  @Input({}) method: string = '';
  constructor(private systemApi: SystemApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['method']) {
      this.search('');
    }
  }

  loading: boolean = false;
  async search(q: string) {
    try {
      this.loading = true;
      this.items = await this.systemApi.findRoutes({
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
