import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzFormatEmitEvent, NzTreeModule } from 'ng-zorro-antd/tree';
import { Permission } from '../../../models/system';
import { SystemApiService } from '../../../services/apis/system-api.service';

@Component({
  selector: 'app-permission-multiple-checker',
  imports: [NzTreeModule],
  templateUrl: './permission-multiple-checker.component.html',
  styleUrl: './permission-multiple-checker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PermissionMultipleCheckerComponent),
      multi: true,
    },
  ],
})
export class PermissionMultipleCheckerComponent
  implements ControlValueAccessor, OnInit
{
  constructor(private systemApi: SystemApiService) {}

  ngOnInit(): void {
    this.findPermissions();
  }

  nodes: any[] = [];
  data: Permission[] = [];
  async findPermissions() {
    try {
      this.data = await this.systemApi.findPermissions();
      this.convertNodes();
      const keys = this.keys;
      this.keys = [];
      setTimeout(() => {
        this.keys = keys;
      }, 0);
    } catch (error) {}
  }

  convertNodes() {
    this.nodes = [];
    for (const p of this.data) {
      this.nodes.push(this.convertNode(p));
    }
  }

  convertNode(p: Permission) {
    const n: any = {
      title: `${p.name}(${p.code})`,
      key: p.id.toString(),
      children: p.children
        ? p.children.map((c: any) => this.convertNode(c))
        : [],
      data: Object.assign({}, p),
      expanded: true,
      checked: this.keys.includes(p.id.toString()),
    };
    n.isLeaf = !n.children.length;

    return n;
  }

  keys: string[] = [];

  getCheckedKeys(node: any): string[] {
    const keys = [];
    if (node.checked) {
      keys.push(node.key);
    }
    for (const child of node.children) {
      keys.push(...this.getCheckedKeys(child));
    }
    return keys;
  }

  onValueChagned(e: NzFormatEmitEvent) {
    const keys: number[] = [];
    for (const node of this.nodes) {
      keys.push(...this.getCheckedKeys(node).map((k) => parseInt(k)));
    }
    this.onFormChange(keys);
  }

  writeValue(v: number[] = []) {
    this.keys = v.map((k) => k.toString());
    this.convertNodes();
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
