import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent {
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
