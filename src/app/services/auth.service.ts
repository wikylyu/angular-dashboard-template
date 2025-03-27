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
  }
}
