import { Injectable } from '@angular/core';
import { AdminUser } from '../../models/admin';
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
}
