import { Component, ViewChild } from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
  NzDropDownModule,
} from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import {
  NzFormatBeforeDropEvent,
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeModule,
} from 'ng-zorro-antd/tree';
import { Observable, of } from 'rxjs';
import { CardComponent } from '../../../components/common/card/card.component';
import { CreateButtonComponent } from '../../../components/common/create-button/create-button.component';
import { PageContentComponent } from '../../../components/layout/page-content/page-content.component';
import { UpdatePermissionModalComponent } from '../../../components/system/update-permission-modal/update-permission-modal.component';
import { Permission } from '../../../models/system';
import { SystemApiService } from '../../../services/apis/system-api.service';
import { deepCopy } from '../../../utils/data';

@Component({
  selector: 'app-permissions-page',
  imports: [
    PageContentComponent,
    CreateButtonComponent,
    NzModalModule,
    NzTreeModule,
    NzDropDownModule,
    NzIconModule,
    CardComponent,
  ],
  templateUrl: './permissions-page.component.html',
  styleUrl: './permissions-page.component.scss',
})
export class PermissionsPageComponent {
  @ViewChild('menu', { static: false }) menu!: NzDropdownMenuComponent;
  constructor(
    private systemApi: SystemApiService,
    private modalService: NzModalService,
    private nzContextMenuService: NzContextMenuService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.findPermissions();
  }

  nodes: any[] = [];
  async findPermissions() {
    try {
      const r = await this.systemApi.findPermissions();
      this.nodes = [];
      for (const p of r) {
        this.nodes.push(this.convertNode(p));
      }
    } catch (error) {}
  }

  convertNode(p: Permission) {
    const n: any = {
      title: `${p.name}(${p.code})`,
      key: p.id,
      expanded: true,
      children: p.children
        ? p.children.map((c: any) => this.convertNode(c))
        : [],
      data: Object.assign({}, p),
    };
    n.isLeaf = !n.children.length;

    return n;
  }

  update(data: any) {
    this.modalService
      .create({
        nzContent: UpdatePermissionModalComponent,
        nzWidth: '480px',
        nzData: deepCopy(data),
      })
      .afterClose.subscribe((r) => {
        if (r) {
          this.findPermissions();
        }
      });
  }

  click(n: any) {}

  contextMenuData: any;
  contextMenu(event: NzFormatEmitEvent) {
    this.contextMenuData = event.node?.origin['data'];
    this.nzContextMenuService.create(event.event!, this.menu);
  }

  edit() {
    this.update(this.contextMenuData);
  }

  createChild() {
    this.update({
      parent_id: this.contextMenuData.id,
    });
  }

  beforeDrop(info: NzFormatBeforeDropEvent): Observable<boolean> {
    const dragNodeParent = info.node?.parentNode;
    const dropNodeParent = info.dragNode?.parentNode;

    // 如果拖拽和放置的目标属于同一父节点，返回 true；否则返回 false
    return of(dragNodeParent === dropNodeParent);
  }

  @ViewChild('tree') tree!: NzTreeComponent;
  onDrop(event: NzFormatEmitEvent): void {
    const nodes = this.tree.getTreeNodes();
    const dragNode = event.dragNode;
    if (!dragNode) {
      return;
    }
    const getIndexInTree = (nodes: any[], key: string): number => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].key === key) {
          return i;
        }
        if (nodes[i].children && nodes[i].children.length > 0) {
          const childIndex = getIndexInTree(nodes[i].children, key);
          if (childIndex !== -1) {
            return childIndex;
          }
        }
      }
      return -1;
    };

    const index = getIndexInTree(nodes, dragNode.key);
    this.updatePermissionSort(parseInt(dragNode.key), index);
  }

  async updatePermissionSort(id: number, sort: number) {
    try {
      await this.systemApi.updatePermissionSort(id, { sort });
    } catch (error) {}
  }

  delete() {
    this.modalService.confirm({
      nzTitle: '删除权限',
      nzContent:
        '是否确认删除该权限？该操作会删除所有子权限，并从API中移除权限',
      nzOkDanger: true,
      nzOnOk: () => this.deletePermission(this.contextMenuData.id),
    });
  }

  async deletePermission(id: number) {
    try {
      await this.systemApi.deletePermission(id);
      this.messageService.success('删除成功');
    } catch (error) {
    } finally {
      this.findPermissions();
    }
  }
}
