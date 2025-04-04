import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AdminRole, AdminUser } from '../../../models/admin';
import { AdminApiService } from '../../../services/apis/admin-api.service';

@Component({
  selector: 'app-admin-user-roles',
  imports: [NzTagModule],
  templateUrl: './admin-user-roles.component.html',
  styleUrl: './admin-user-roles.component.scss',
})
export class AdminUserRolesComponent implements OnChanges {
  @Input({ required: true }) user!: AdminUser;

  constructor(private adminApi: AdminApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.findAdminUserRoles();
  }

  roles: AdminRole[] = [];

  async findAdminUserRoles() {
    try {
      this.roles = await this.adminApi.findAdminUserRoles(this.user.id);
    } catch (error) {}
  }
}
