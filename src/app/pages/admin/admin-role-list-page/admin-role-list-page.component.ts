import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdminUserLabelComponent } from '../../../components/admin/admin-user-label/admin-user-label.component';
import { CardComponent } from '../../../components/common/card/card.component';
import { CreateButtonComponent } from '../../../components/common/create-button/create-button.component';
import { SearchButtonComponent } from '../../../components/common/search-button/search-button.component';
import { PageActionbarComponent } from '../../../components/layout/page-actionbar/page-actionbar.component';
import { PageContentComponent } from '../../../components/layout/page-content/page-content.component';
import { AdminRole } from '../../../models/admin';
import { AdminApiService } from '../../../services/apis/admin-api.service';

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
    NzDropDownModule,
    DatePipe,
    AdminUserLabelComponent,
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

  constructor(private adminApi: AdminApiService) {}

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

  view(data: AdminRole) {}

  update(data: AdminRole | undefined) {}
}
