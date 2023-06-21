import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { StaffApiService } from 'src/app/services/staff-api.service';
import {
  mergeRouter,
  parseIntQuery,
  parseStringQuery,
} from 'src/app/utils/router';

@Component({
  selector: 'app-admin-staff-list-page',
  templateUrl: './admin-staff-list-page.component.html',
  styleUrls: ['./admin-staff-list-page.component.scss'],
})
export class AdminStaffListPageComponent {
  query = '';
  queryStatus = '';
  page = 1;
  pageSize = 10;
  total = 0;
  loading = false;
  staffs: any[] = [];
  constructor(
    private api: AdminApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(() => {
      this.loadRouter();
      this.findAdminStaffs();
    });
  }

  mergeRouter() {
    mergeRouter(this.router, this.route, {
      query: this.query,
      status: this.queryStatus,
      page: this.page,
      page_size: this.pageSize,
    });
  }

  loadRouter() {
    this.query = parseStringQuery(this.route, 'query', '');
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

  async findAdminStaffs() {
    try {
      this.loading = true;
      const r = await this.api.findAdminStaffs(
        this.query,
        this.queryStatus,
        this.page,
        this.pageSize
      );
      const data = r.data;
      this.total = data.total;
      this.staffs = data.list;
      this.page = data.page;
      this.pageSize = data.page_size;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  isUpdateAdminStaffModalVisible = false;
  updateAdminStaffData: any = null;
  showUpdateAdminStaffModal(data: any) {
    this.isUpdateAdminStaffModalVisible = true;
    this.updateAdminStaffData = Object.assign({}, data);
  }

  isUpdateAdminStaffPasswordModalVisible = false;
  updateAdminStaffPasswordData: any = null;
  showUpdateAdminStaffPasswordModal(data: any) {
    this.isUpdateAdminStaffPasswordModalVisible = true;
    this.updateAdminStaffPasswordData = Object.assign({}, data);
  }
}
