import { Injectable } from '@angular/core';
import { AdminUser } from '../../models/admin';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpService) {}

  buildurl(path: string, queryMap: any = null): string {
    return this.http.buildurl(`/auth${path}`, queryMap);
  }

  get loginCaptchaUrl() {
    return this.buildurl('/login/captcha');
  }

  get passwordCaptcahaUrl() {
    return this.buildurl('/password/captcha');
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

  updatePassword({ password, captcha }: { password: string; captcha: string }) {
    const url = this.buildurl('/password');
    return this.http.put(url, { password, captcha });
  }

  checkPermissions({
    codes,
  }: {
    codes: string[];
  }): Promise<Record<string, boolean>> {
    const url = this.buildurl('/permissions', { codes });
    return this.http.fget(url);
  }
}
