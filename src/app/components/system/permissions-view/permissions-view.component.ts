import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { SystemApiService } from '../../../services/apis/system-api.service';

@Component({
  selector: 'app-permissions-view',
  imports: [NzTreeModule, NzIconModule, NzCheckboxModule, FormsModule],
  templateUrl: './permissions-view.component.html',
  styleUrl: './permissions-view.component.scss',
})
export class PermissionsViewComponent implements OnInit, OnChanges {
  @Input({ required: true }) permission_ids: number[] = [];
  constructor(private systemApi: SystemApiService) {}

  ngOnInit(): void {
    this.findPermissions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.keys = this.permission_ids.map((p: any) => p.toString());
  }

  keys: string[] = [];

  nodes: any[] = [];
  async findPermissions() {
    try {
      const r = await this.systemApi.findPermissions();
      this.nodes = [];
      for (const p of r) {
        this.nodes.push(this.convertNode(p, false));
      }
    } catch (error) {}
  }

  convertNode(p: any, enabled: boolean) {
    enabled = this.keys.includes(p.id.toString()) || enabled;
    const n: any = {
      title: `${p.name}(${p.code})`,
      key: p.id.toString(),
      children: p.children
        ? p.children.map((c: any) => this.convertNode(c, enabled))
        : [],
      data: Object.assign({}, p),
      expanded: true,
      checked: this.keys.includes(p.id.toString()),
      // disabled: !enabled,
      selectable: false,
      isHalfChecked: false,
    };
    n.isLeaf = !n.children.length;

    var checkedChilren = 0,
      uncheckedChildren = 0;
    for (const c of n.children) {
      if (c.checked) {
        checkedChilren++;
      } else {
        uncheckedChildren++;
      }
    }
    if (checkedChilren > 0 && uncheckedChildren > 0) {
      n.isHalfChecked = true;
    }

    return n;
  }
}
