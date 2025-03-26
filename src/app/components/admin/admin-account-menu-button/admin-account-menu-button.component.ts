import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AuthApiService } from '../../../services/apis/auth-api.service';
import { AuthService } from '../../../services/auth.service';
import { UpdateAdminPasswordModalComponent } from '../update-admin-password-modal/update-admin-password-modal.component';
import { UpdateAuthProfileModalComponent } from '../update-auth-profile-modal/update-auth-profile-modal.component';

@Component({
  selector: 'app-admin-account-menu-button',
  imports: [NzAvatarModule, NzMenuModule, NzDropDownModule, NzModalModule],
  templateUrl: './admin-account-menu-button.component.html',
  styleUrl: './admin-account-menu-button.component.scss',
})
export class AdminAccountMenuButtonComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private authApi: AuthApiService,
    private modalService: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProfile();
  }

  get profile() {
    return this.authService.profile();
  }

  openAdminProfileModal() {
    this.modalService.create({
      nzContent: UpdateAuthProfileModalComponent,
      nzWidth: '420px',
    });
  }

  openAdminPasswordModal() {
    this.modalService.create({
      nzContent: UpdateAdminPasswordModalComponent,
      nzWidth: '420px',
    });
  }

  logout() {
    this.modalService.confirm({
      nzTitle: '确定要退出登录吗?',
      nzOkDanger: true,
      nzOnOk: () => this.doLogout(),
    });
  }
  loading: boolean = false;
  async doLogout() {
    try {
      this.loading = true;
      await this.authApi.logout();
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
