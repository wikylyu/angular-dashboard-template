import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';
import {
  parseIntQuery,
  parseStringQuery,
  mergeRouter,
} from 'src/app/utils/router';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
})
export class UserListPageComponent {
  query = '';
  queryStatus = '';
  page = 1;
  loading = false;
  users: any[] = [];
  total = 0;
  pageSize = 10;

  constructor(
    private api: UserApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(() => {
      this.loadRouter();
      this.findUsers();
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

  async findUsers() {
    try {
      this.loading = true;
      const r = await this.api.findUsers(
        this.query,
        this.queryStatus,
        this.page,
        this.pageSize
      );
      const data = r.data;
      this.total = data.total;
      this.users = data.list;
      this.page = data.page;
      this.pageSize = data.page_size;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  isUserModalVisible = false;
  UserData: any = null;
  showUserModal(data: any) {
    this.isUserModalVisible = true;
    this.UserData = Object.assign({}, data);
  }
}
