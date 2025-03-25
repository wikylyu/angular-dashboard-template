import { Pipe, PipeTransform } from '@angular/core';
import { AdminUserStatus } from '../../models/admin';

@Pipe({
  name: 'adminUserStatusName',
})
export class AdminUserStatusNamePipe implements PipeTransform {
  transform(value: AdminUserStatus, ...args: unknown[]): string {
    switch (value) {
      case AdminUserStatus.ACTIVE:
        return '正常';
      case AdminUserStatus.BANNED:
        return '封禁';
      default:
        return '未知';
    }
  }
}
