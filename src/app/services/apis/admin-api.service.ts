import { Injectable } from '@angular/core';
import { AdminUser, AdminUserStatus } from '../../models/admin';
import { Pagination } from '../../models/base';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private http: HttpService) {}

  buildurl(path: string, queryMap: any = null): string {
    return this.http.buildurl(`/admin${path}`, queryMap);
  }

  getAdminUser(id: number): Promise<AdminUser> {
    const url = this.buildurl(`/user/${id}`);
    return this.http.fget(url);
  }

  findAdminUsers({
    query,
    status,
    page,
    page_size,
  }: {
    query: string;
    status: string;
    page: number;
    page_size: number;
  }): Promise<Pagination<AdminUser>> {
    const url = this.buildurl(`/users`, { query, status, page, page_size });
    return this.http.fget(url);
  }

  createAdminUser({
    username,
    password,
    name,
    email,
    phone,
    status,
  }: {
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    status: AdminUserStatus;
  }) {
    const url = this.buildurl(`/user`);
    return this.http.post(url, {
      username,
      password,
      name,
      email,
      phone,
      status,
    });
  }

  updateAdminUser(
    id: number,
    {
      name,
      email,
      phone,
      password,
      status,
    }: {
      name: string;
      email: string;
      phone: string;
      password: string;
      status: AdminUserStatus;
    }
  ) {
    const url = this.buildurl(`/user/${id}`);
    return this.http.put(url, { name, email, phone, password, status });
  }
}
