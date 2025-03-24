import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { Permission } from '../../../models/system';
import { SystemApiService } from '../../../services/apis/system-api.service';

@Component({
  selector: 'app-permission-select',
  imports: [
    NzSelectModule,
    NzTreeSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './permission-select.component.html',
  styleUrl: './permission-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PermissionSelectComponent),
      multi: true,
    },
  ],
})
export class PermissionSelectComponent implements OnInit, ControlValueAccessor {
  @Input() disabledID = 0;
  value = '';
  constructor(private systemApi: SystemApiService) {}

  ngOnInit(): void {
    this.findPermissions();
  }

  nodes: any[] = [];
  async findPermissions() {
    try {
      const r = await this.systemApi.findPermissions();
      this.nodes = [];
      for (const p of r) {
        this.nodes.push(this.convertNode(p, p.id === this.disabledID));
      }
    } catch (error) {}
  }

  convertNode(p: Permission, disabled: boolean) {
    const n: any = {
      title: `${p.name}(${p.code})`,
      key: p.id.toString(),
      children: p.children
        ? p.children.map((c: any) => this.convertNode(c, disabled))
        : [],
      disabled: disabled || p.id === this.disabledID,
      data: Object.assign({}, p),
      expanded: true,
    };
    n.isLeaf = !n.children.length;

    return n;
  }

  onChange(e: any) {
    if (this.value) {
      this.onFormChange(parseInt(this.value));
    } else {
      this.onFormChange(0);
    }
  }

  writeValue(v: number) {
    this.value = v > 0 ? v.toString() : '';
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
