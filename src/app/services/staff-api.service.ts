import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class StaffApiService {
  constructor(private http: HttpService) {}

  buildurl(path: string, queryMap: any = null): string {
    return this.http.buildurl('/staff' + path, queryMap);
  }

  checkSuperuser() {
    const url = this.buildurl('/superuser');
    return this.http.fget(url);
  }

  createSuperuser(username: string, name: string, password: string) {
    const url = this.buildurl('/superuser');
    const body = {
      username,
      name,
      password,
    };
    return this.http.post(url, body);
  }

  getSelf() {
    const url = this.buildurl('/self');
    return this.http.fget(url);
  }

  trySelf() {
    const url = this.buildurl('/self/try');
    return this.http.fget(url);
  }

  login(
    username: string,
    password: string,
    captcha: string,
    remember: boolean
  ) {
    const url = this.buildurl('/login');
    const body = {
      username,
      password,
      captcha,
      remember,
    };
    return this.http.put(url, body);
  }

  logout() {
    const url = this.buildurl('/logout');
    return this.http.put(url, {});
  }

  updateSelf(name: string, phone: string, email: string) {
    const url = this.buildurl('/self');
    const body = {
      name,
      phone,
      email,
    };
    return this.http.put(url, body);
  }

  updateSelfPassword(old: string, n: string) {
    const url = this.buildurl('/self/password');
    const body = { old, new: n };
    return this.http.put(url, body);
  }
}
