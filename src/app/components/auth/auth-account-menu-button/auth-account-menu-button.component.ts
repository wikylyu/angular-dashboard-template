import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AuthApiService } from '../../../services/apis/auth-api.service';
import { AuthService } from '../../../services/auth.service';
import { UpdateAuthPasswordModalComponent } from '../update-auth-password-modal/update-auth-password-modal.component';
import { UpdateAuthProfileModalComponent } from '../update-auth-profile-modal/update-auth-profile-modal.component';

@Component({
  selector: 'app-auth-account-menu-button',
  imports: [NzAvatarModule, NzMenuModule, NzDropdownModule, NzModalModule],
  templateUrl: './auth-account-menu-button.component.html',
  styleUrl: './auth-account-menu-button.component.scss',
})
export class AuthAccountMenuButtonComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private authApi: AuthApiService,
    private modalService: NzModalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.getProfile();

    this.authService.checkPermissions([
      'admin.user.create',
      'admin.role.update',
      'admin.test',
    ]);
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
      nzContent: UpdateAuthPasswordModalComponent,
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
      await this.authService.logout();
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
