import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AdminService } from '../../../services/admin.service';
import { AdminApiService } from '../../../services/apis/admin-api.service';

@Component({
  selector: 'app-admin-account-menu-button',
  imports: [NzAvatarModule, NzMenuModule, NzDropDownModule, NzModalModule],
  templateUrl: './admin-account-menu-button.component.html',
  styleUrl: './admin-account-menu-button.component.scss',
})
export class AdminAccountMenuButtonComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private adminApi: AdminApiService,
    private modalService: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminService.getProfile();
  }

  get profile() {
    return this.adminService.profile();
  }

  logout() {
    this.modalService.confirm({
      nzTitle: '确定要退出登录吗?',
      nzOnOk: () => this.doLogout(),
    });
  }
  loading: boolean = false;
  async doLogout() {
    try {
      this.loading = true;
      await this.adminApi.logout();
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
