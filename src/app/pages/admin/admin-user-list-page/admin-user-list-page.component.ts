import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AdminUserLabelComponent } from '../../../components/admin/admin-user-label/admin-user-label.component';
import { AdminUserStatusSelectComponent } from '../../../components/admin/admin-user-status-select/admin-user-status-select.component';
import { AdminUserStatusComponent } from '../../../components/admin/admin-user-status/admin-user-status.component';
import { CardComponent } from '../../../components/common/card/card.component';
import { CreateButtonComponent } from '../../../components/common/create-button/create-button.component';
import { SearchButtonComponent } from '../../../components/common/search-button/search-button.component';
import { PageActionbarComponent } from '../../../components/layout/page-actionbar/page-actionbar.component';
import { PageContentComponent } from '../../../components/layout/page-content/page-content.component';
import { AdminUser } from '../../../models/admin';
import { AdminApiService } from '../../../services/apis/admin-api.service';

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
  constructor(private adminApi: AdminApiService) {}

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

  update(data: AdminUser | undefined = undefined) {}

  view(data: AdminUser) {}
}
