import { Injectable, signal } from '@angular/core';
import { AdminUser } from '../models/admin';
import { AuthApiService } from './apis/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  profile = signal<AdminUser | null>(null);
  permissions = signal<Record<string, boolean>>({});

  constructor(private authApi: AuthApiService) {}

  async getProfile(): Promise<AdminUser> {
    const r = await this.authApi.getProfile();
    this.profile.set(r);
    return r;
  }

  async logout() {
    this.authApi.logout();
    this.profile.set(null);
    this.permissions.set({});
  }

  async checkPermissions(codes: string[]): Promise<Record<string, boolean>> {
    /* 检查权限 */
    const permissions = this.permissions();
    var r: Record<string, boolean> = {};
    const uncheckedCodes: string[] = [];
    for (const code of codes) {
      if (code in permissions) {
        r[code] = permissions[code]; // 已经检查过
      } else {
        uncheckedCodes.push(code); // 当前需要检查的权限
      }
    }
    if (uncheckedCodes.length > 0) {
      const checked = await this.authApi.checkPermissions(uncheckedCodes);
      console.log(checked);
      // this.permissions.update((p) => ({
      //   ...p,
      //   ...checked,
      // }));
      r = {
        ...r,
        ...checked,
      };
    }
    return r;
  }
}
