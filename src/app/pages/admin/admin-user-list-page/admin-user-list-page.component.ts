import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AdminUserLabelComponent } from '../../../components/admin/admin-user-label/admin-user-label.component';
import { AdminUserModalComponent } from '../../../components/admin/admin-user-modal/admin-user-modal.component';
import { AdminUserRolesComponent } from '../../../components/admin/admin-user-roles/admin-user-roles.component';
import { AdminUserStatusSelectComponent } from '../../../components/admin/admin-user-status-select/admin-user-status-select.component';
import { AdminUserStatusComponent } from '../../../components/admin/admin-user-status/admin-user-status.component';
import { CreateAdminUserModalComponent } from '../../../components/admin/create-admin-user-modal/create-admin-user-modal.component';
import { UpdateAdminUserModalComponent } from '../../../components/admin/update-admin-user-modal/update-admin-user-modal.component';
import { CardComponent } from '../../../components/common/card/card.component';
import { CreateButtonComponent } from '../../../components/common/create-button/create-button.component';
import { SearchButtonComponent } from '../../../components/common/search-button/search-button.component';
import { PageActionbarComponent } from '../../../components/layout/page-actionbar/page-actionbar.component';
import { PageContentComponent } from '../../../components/layout/page-content/page-content.component';
import { AdminUser } from '../../../models/admin';
import { AdminApiService } from '../../../services/apis/admin-api.service';
import { deepCopy } from '../../../utils/data';

@Component({
  selector: 'app-admin-user-list-page',
  imports: [
    PageContentComponent,
    CreateButtonComponent,
    NzInputModule,
    PageActionbarComponent,
    FormsModule,
    SearchButtonComponent,
    AdminUserStatusSelectComponent,
    CardComponent,
    NzIconModule,
    NzDropDownModule,
    NzTableModule,
    AdminUserLabelComponent,
    AdminUserStatusComponent,
    DatePipe,
    NzToolTipModule,
    NzModalModule,
    AdminUserRolesComponent,
  ],
  templateUrl: './admin-user-list-page.component.html',
  styleUrl: './admin-user-list-page.component.scss',
})
export class AdminUserListPageComponent implements OnInit {
  query: string = '';
  queryStatus: string = '';
  page: number = 1;
  pageSize: number = 10;
  total: number = 0;
  items: AdminUser[] = [];
  loading: boolean = false;
  constructor(
    private adminApi: AdminApiService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.page = 1;
    this.findAdminUsers();
  }

  async findAdminUsers() {
    try {
      this.loading = true;
      const r = await this.adminApi.findAdminUsers({
        query: this.query,
        status: this.queryStatus,
        page: this.page,
        page_size: this.pageSize,
      });
      this.items = r.items;
      this.total = r.total;
      this.page = r.page;
      this.pageSize = r.page_size;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  create() {
    this.modalService
      .create({
        nzContent: CreateAdminUserModalComponent,
        nzWidth: '480px',
      })
      .afterClose.subscribe((r) => {
        this.findAdminUsers();
      });
  }

  update(data: AdminUser) {
    this.modalService
      .create({
        nzContent: UpdateAdminUserModalComponent,
        nzWidth: '480px',
        nzData: deepCopy(data),
      })
      .afterClose.subscribe((r) => {
        this.findAdminUsers();
      });
  }

  view(data: AdminUser) {
    this.modalService.create({
      nzContent: AdminUserModalComponent,
      nzWidth: '640px',
      nzData: deepCopy(data),
    });
  }
}
