import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-staff-label',
  templateUrl: './admin-staff-label.component.html',
  styleUrls: ['./admin-staff-label.component.scss'],
})
export class AdminStaffLabelComponent implements OnChanges {
  @Input() id = 0;

  constructor(private api: AdminApiService) {}

  data: any = null;
  ngOnChanges(changes: SimpleChanges): void {
    this.getAdminStaff();
  }

  async getAdminStaff() {
    if (!this.id) {
      this.data = null;
      return;
    }
    try {
      const r = await this.api.getAdminStaff(this.id);
      this.data = r.data;
    } catch (error) {}
  }
}
