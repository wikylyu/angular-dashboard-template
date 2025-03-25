import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AdminUser } from '../../../models/admin';
import { AdminApiService } from '../../../services/apis/admin-api.service';

@Component({
  selector: 'app-admin-user-label',
  imports: [],
  templateUrl: './admin-user-label.component.html',
  styleUrl: './admin-user-label.component.scss',
})
export class AdminUserLabelComponent implements OnChanges {
  @Input({ required: true }) id: number | undefined = 0;

  constructor(private adminApi: AdminApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getAdminUser();
  }

  data: AdminUser | undefined = undefined;
  async getAdminUser() {
    this.data = undefined;
    if (!this.id) {
      return;
    }
    try {
      this.data = await this.adminApi.getAdminUser(this.id);
    } catch (error) {}
  }
}
