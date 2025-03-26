import { Injectable, signal } from '@angular/core';
import { AdminUser } from '../models/admin';
import { AuthApiService } from './apis/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  profile = signal<AdminUser | null>(null);

  constructor(private authApi: AuthApiService) {}

  async getProfile(): Promise<AdminUser> {
    const r = await this.authApi.getProfile();
    this.profile.set(r);
    return r;
  }
}
