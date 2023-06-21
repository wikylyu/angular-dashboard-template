import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private http: HttpService) {}

  buildurl(path: string, queryMap: any = null): string {
    return this.http.buildurl('/admin' + path, queryMap);
  }

  findAdminStaffs(
    query: string,
    status: string,
    page: number,
    pageSize: number
  ) {
    const q = {
      query,
      status,
      page,
      page_size: pageSize,
    };
    const url = this.buildurl('/staffs', q);
    return this.http.fget(url);
  }

  getAdminStaff(id: number) {
    const url = this.buildurl(`/staff/${id}`);
    return this.http.fget(url);
  }

  updateAdminStaff(
    id: number,
    name: string,
    phone: string,
    email: string,
    status: string
  ) {
    const url = this.buildurl(`/staff/${id}`);
    const body = { name, phone, email, status };
    return this.http.put(url, body);
  }

  updateAdminStaffPassword(id: number, password: string, logout: boolean) {
    const url = this.buildurl(`/staff/${id}/password`);
    const body = { password, logout };
    return this.http.put(url, body);
  }

  findAdminStaffTokens(
    staffID: number,
    status: string,
    page: number,
    pageSize: number
  ) {
    const q = {
      staff_id: staffID,
      status,
      page,
      page_size: pageSize,
    };
    const url = this.buildurl(`/staff/tokens`, q);
    return this.http.fget(url);
  }
}
