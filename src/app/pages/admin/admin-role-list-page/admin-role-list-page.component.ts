import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdminRoleModalComponent } from '../../../components/admin/admin-role-modal/admin-role-modal.component';
import { AdminUserLabelComponent } from '../../../components/admin/admin-user-label/admin-user-label.component';
import { UpdateAdminRoleModalComponent } from '../../../components/admin/update-admin-role-modal/update-admin-role-modal.component';
import { CardComponent } from '../../../components/common/card/card.component';
import { CreateButtonComponent } from '../../../components/common/create-button/create-button.component';
import { SearchButtonComponent } from '../../../components/common/search-button/search-button.component';
import { PageActionbarComponent } from '../../../components/layout/page-actionbar/page-actionbar.component';
import { PageContentComponent } from '../../../components/layout/page-content/page-content.component';
import { PermsDirective } from '../../../directives/perms.directive';
import { AdminRole } from '../../../models/admin';
import { AdminApiService } from '../../../services/apis/admin-api.service';
import { deepCopy } from '../../../utils/data';

@Component({
  selector: 'app-admin-role-list-page',
  imports: [
    PageContentComponent,
    PageActionbarComponent,
    NzInputModule,
    SearchButtonComponent,
    CreateButtonComponent,
    FormsModule,
    CardComponent,
    NzTableModule,
    NzIconModule,
    NzDropdownModule,
    DatePipe,
    AdminUserLabelComponent,
    NzModalModule,
    PermsDirective,
  ],
  templateUrl: './admin-role-list-page.component.html',
  styleUrl: './admin-role-list-page.component.scss',
})
export class AdminRoleListPageComponent implements OnInit {
  query: string = '';
  loading: boolean = false;
  page: number = 1;
  pageSize: number = 10;
  total: number = 0;
  items: AdminRole[] = [];

  constructor(
    private adminApi: AdminApiService,
    private modalService: NzModalService,
  ) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.page = 1;
    this.findAdminRoles();
  }

  async findAdminRoles() {
    this.loading = true;
    try {
      const r = await this.adminApi.findAdminRoles({
        query: this.query,
        page: this.page,
        page_size: this.pageSize,
      });
      this.items = r.items;
      this.total = r.total;
      this.page = r.page;
      this.pageSize = r.page_size;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  view(data: AdminRole) {
    this.modalService.create({
      nzContent: AdminRoleModalComponent,
      nzWidth: '640px',
      nzData: deepCopy(data),
    });
  }

  update(data: AdminRole | undefined = undefined) {
    this.modalService
      .create({
        nzContent: UpdateAdminRoleModalComponent,
        nzWidth: '480px',
        nzData: deepCopy(data),
      })
      .afterClose.subscribe((r) => {
        if (r) {
          this.findAdminRoles();
        }
      });
  }
}
