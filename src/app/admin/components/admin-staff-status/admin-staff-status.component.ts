import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-staff-status',
  templateUrl: './admin-staff-status.component.html',
  styleUrls: ['./admin-staff-status.component.scss'],
})
export class AdminStaffStatusComponent {
  @Input() status = '';

  text() {
    const m: any = {
      OK: '正常',
      Banned: '封禁',
    };
    return m[this.status] || '未知';
  }

  color() {
    const m: any = {
      OK: 'success',
      Banned: 'warning',
    };
    return m[this.status] || 'error';
  }
}
