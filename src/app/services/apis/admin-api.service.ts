import { Injectable } from '@angular/core';
import { AdminConfig, AdminUser } from '../../models/admin';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private http: HttpService) {}

  buildurl(path: string, queryMap: any = null): string {
    return this.http.buildurl(`/admin${path}`, queryMap);
  }

  get loginCaptchaUrl() {
    return this.buildurl('/login/captcha');
  }

  createSuperuser({
    username,
    password,
    name,
  }: {
    username: string;
    password: string;
    name: string;
  }) {
    const url = this.buildurl('/superuser');
    return this.http.post(url, { username, password, name });
  }

  getAdminConfig(): Promise<AdminConfig> {
    return this.http.fget(this.buildurl('/config'));
  }

  getProfile(): Promise<AdminUser> {
    const url = this.buildurl('/profile');
    return this.http.fget(url);
  }

  login({
    username,
    password,
    remember,
    captcha,
  }: {
    username: string;
    password: string;
    remember: boolean;
    captcha: string;
  }) {
    const url = this.buildurl('/login');
    return this.http.put(url, { username, password, remember, captcha });
  }

  logout() {
    const url = this.buildurl('/logout');
    return this.http.put(url, {});
  }

  updateProfile({
    name,
    email,
    phone,
  }: {
    name: string;
    email: string;
    phone: string;
  }) {
    const url = this.buildurl('/profile');
    return this.http.put(url, { name, email, phone });
  }
}
