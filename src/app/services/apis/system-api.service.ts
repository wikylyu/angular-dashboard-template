import { Injectable } from '@angular/core';
import { Pagination } from '../../models/base';
import { Api, Permission, Route } from '../../models/system';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SystemApiService {
  constructor(private http: HttpService) {}

  buildurl(path: string, queryMap: any = null): string {
    return this.http.buildurl(`/system${path}`, queryMap);
  }

  findRoutes({
    method = '',
    path = '',
  }: {
    method: string;
    path: string;
  }): Promise<Route[]> {
    const url = this.buildurl('/routes', { method, path });
    return this.http.fget(url);
  }

  findPermissions(): Promise<Permission[]> {
    const url = this.buildurl('/permissions');
    return this.http.fget(url);
  }

  createPermission({
    name,
    code,
    parent_id,
    remark,
  }: {
    name: string;
    code: string;
    parent_id: number;
    remark: string;
  }) {
    const url = this.buildurl(`/permission`);
    const body = { name, code, parent_id, remark };
    return this.http.post(url, body);
  }

  updatePermission(
    id: number,
    {
      name,
      code,
      parent_id,
      remark,
    }: {
      name: string;
      code: string;
      parent_id: number;
      remark: string;
    }
  ) {
    const url = this.buildurl(`/permission/${id}`);
    const body = { name, code, parent_id, remark };
    return this.http.put(url, body);
  }

  updatePermissionSort(id: number, { sort }: { sort: number }) {
    const url = this.buildurl(`/permission/${id}/sort`);
    const body = { sort };
    return this.http.put(url, body);
  }

  deletePermission(id: number) {
    const url = this.buildurl(`/permission/${id}`);
    return this.http.delete(url);
  }

  getPermission(id: number): Promise<Permission[]> {
    const url = this.buildurl(`/permission/${id}`);
    return this.http.fget(url);
  }

  findApis({
    method,
    path,
    page,
    page_size,
  }: {
    method: string;
    path: string;
    page: number;
    page_size: number;
  }): Promise<Pagination<Api>> {
    const url = this.buildurl(`/apis`, { method, path, page, page_size });
    return this.http.fget(url);
  }

  createApi({
    method,
    path,
    permission_ids,
  }: {
    method: string;
    path: string;
    permission_ids: number[];
  }) {
    const url = this.buildurl(`/api`);
    const body = { method, path, permission_ids };
    return this.http.post(url, body);
  }

  updateApi(
    id: number,
    {
      method,
      path,
      permission_ids,
    }: {
      method: string;
      path: string;
      permission_ids: number[];
    }
  ) {
    const url = this.buildurl(`/api/${id}`);
    const body = { method, path, permission_ids };
    return this.http.put(url, body);
  }

  deleteApi(id: number) {
    const url = this.buildurl(`/api/${id}`);
    return this.http.delete(url);
  }
}
