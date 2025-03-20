import { Injectable, signal } from '@angular/core';
import { AdminConfig, AdminUser } from '../models/admin';
import { AdminApiService } from './apis/admin-api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  config = signal<AdminConfig | null>(null);
  profile = signal<AdminUser | null>(null);

  constructor(private adminApi: AdminApiService) {}

  async getAdminConfig(): Promise<AdminConfig | null> {
    try {
      const r = await this.adminApi.getAdminConfig();
      this.config.set(r);
      return r;
    } catch (error) {}
    return null;
  }

  async getProfile(): Promise<AdminUser> {
    const r = await this.adminApi.getProfile();
    this.profile.set(r);
    return r;
  }
}
