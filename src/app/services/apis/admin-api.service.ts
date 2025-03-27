import { Injectable } from '@angular/core';
import { AdminRole, AdminUser, AdminUserStatus } from '../../models/admin';
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
    role_ids,
  }: {
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    status: AdminUserStatus;
    role_ids: number[];
  }) {
    const url = this.buildurl(`/user`);
    return this.http.post(url, {
      username,
      password,
      name,
      email,
      phone,
      status,
      role_ids,
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
      role_ids,
    }: {
      name: string;
      email: string;
      phone: string;
      password: string;
      status: AdminUserStatus;
      role_ids: number[];
    }
  ) {
    const url = this.buildurl(`/user/${id}`);
    return this.http.put(url, {
      name,
      email,
      phone,
      password,
      status,
      role_ids,
    });
  }

  createAdminRole({
    name,
    remark,
    permission_ids,
  }: {
    name: string;
    remark: string;
    permission_ids: number[];
  }) {
    const url = this.buildurl(`/role`);
    return this.http.post(url, { name, remark, permission_ids });
  }

  updateAdminRole(
    id: number,
    {
      name,
      remark,
      permission_ids,
    }: { name: string; remark: string; permission_ids: number[] }
  ) {
    const url = this.buildurl(`/role/${id}`);
    return this.http.put(url, { name, remark, permission_ids });
  }

  findAdminRoles({
    query,
    page,
    page_size,
  }: {
    query: string;
    page: number;
    page_size: number;
  }): Promise<Pagination<AdminRole>> {
    const url = this.buildurl(`/roles`, { query, page, page_size });
    return this.http.fget(url);
  }

  findAdminUserRoles(id: number): Promise<AdminRole[]> {
    const url = this.buildurl(`/user/${id}/roles`);
    return this.http.fget(url);
  }

  getAdminRole(id: number) {
    const url = this.buildurl(`/role/${id}`);
    return this.http.fget(url);
  }
}
