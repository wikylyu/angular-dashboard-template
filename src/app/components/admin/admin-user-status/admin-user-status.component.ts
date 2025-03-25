import { Component, Input } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AdminUserStatus } from '../../../models/admin';
import { AdminUserStatusNamePipe } from '../../../pipes/admin/admin-user-status-name.pipe';

@Component({
  selector: 'app-admin-user-status',
  imports: [NzTagModule, AdminUserStatusNamePipe],
  templateUrl: './admin-user-status.component.html',
  styleUrl: './admin-user-status.component.scss',
})
export class AdminUserStatusComponent {
  @Input({ required: true }) status!: AdminUserStatus;

  get color() {
    switch (this.status) {
      case AdminUserStatus.ACTIVE:
        return 'success';
      case AdminUserStatus.BANNED:
        return 'error';
      default:
        return 'black';
    }
  }
}
