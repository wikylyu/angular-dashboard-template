import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StaffApiService } from 'src/app/services/staff-api.service';

@Component({
  selector: 'app-staff-avatar-menu',
  templateUrl: './staff-avatar-menu.component.html',
  styleUrls: ['./staff-avatar-menu.component.scss'],
})
export class StaffAvatarMenuComponent implements OnInit {
  constructor(
    private router: Router,
    private api: StaffApiService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getSelf();
  }

  async logout() {
    try {
      await this.api.logout();
    } catch (error) {
    } finally {
      this.router.navigateByUrl('/login');
    }
  }

  data: any = {};
  async getSelf() {
    try {
      const r = await this.api.getSelf();
      this.data = r.data;
    } catch (error) {}
  }
  isUpdateSelfProfileModalVisible = false;
  updateSelfProfileData: any = {};
  showUpdateSelfProfileModal() {
    this.isUpdateSelfProfileModalVisible = true;
    this.updateSelfProfileData = Object.assign({}, this.data);
  }

  onUpdate(data: any) {
    this.data = data;
  }

  isUpdateSelfPasswordModalVisible = false;
  showUpdateSelfPasswordModal() {
    this.isUpdateSelfPasswordModalVisible = true;
  }

  showSettingModal() {}
}
