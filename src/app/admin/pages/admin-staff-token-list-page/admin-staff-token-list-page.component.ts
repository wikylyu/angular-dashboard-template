import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from 'src/app/services/admin-api.service';
import {
  mergeRouter,
  parseIntQuery,
  parseStringQuery,
} from 'src/app/utils/router';

@Component({
  selector: 'app-admin-staff-token-list-page',
  templateUrl: './admin-staff-token-list-page.component.html',
  styleUrls: ['./admin-staff-token-list-page.component.scss'],
})
export class AdminStaffTokenListPageComponent {
  queryStaffID = 0;
  queryStatus = '';
  page = 1;
  pageSize = 10;
  total = 0;
  tokens: any[] = [];
  loading = false;
  constructor(
    private api: AdminApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(() => {
      this.loadRouter();
      this.findAdminStaffTokens();
    });
  }

  mergeRouter() {
    mergeRouter(this.router, this.route, {
      staff_id: this.queryStaffID,
      status: this.queryStatus,
      page: this.page,
      page_size: this.pageSize,
    });
  }

  loadRouter() {
    this.queryStaffID = parseIntQuery(this.route, 'staff_id', 0);
    this.queryStatus = parseStringQuery(this.route, 'status', '');
    this.page = parseIntQuery(this.route, 'page', 1);
    this.pageSize = parseIntQuery(this.route, 'page_size', 10);
  }

  search() {
    this.page = 1;
    this.mergeRouter();
  }

  onPageChange() {
    this.mergeRouter();
  }

  async findAdminStaffTokens() {
    try {
      this.loading = true;
      const r = await this.api.findAdminStaffTokens(
        this.queryStaffID,
        this.queryStatus,
        this.page,
        this.pageSize
      );
      const data = r.data;
      this.page = data.page;
      this.pageSize = data.page_size;
      this.total = data.total;
      this.tokens = data.list;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
