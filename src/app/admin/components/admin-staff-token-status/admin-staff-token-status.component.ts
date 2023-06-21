import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-staff-token-status',
  templateUrl: './admin-staff-token-status.component.html',
  styleUrls: ['./admin-staff-token-status.component.scss'],
})
export class AdminStaffTokenStatusComponent {
  @Input() status = '';

  text() {
    const m: any = {
      OK: '正常',
      Invalid: '失效',
    };
    return m[this.status] || '未知';
  }

  color() {
    const m: any = {
      OK: 'success',
      Invalid: 'warning',
    };
    return m[this.status] || 'error';
  }
}
