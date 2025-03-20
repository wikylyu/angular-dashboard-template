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

  getAdminConfig(): Promise<AdminConfig> {
    return this.http.fget(this.buildurl('/config'));
  }

  getProfile(): Promise<AdminUser> {
    const url = this.buildurl('/profile');
    return this.http.fget(url);
  }
}
