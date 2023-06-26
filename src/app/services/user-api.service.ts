import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpService) {}

  buildurl(path: string, queryMap: any = null): string {
    return this.http.buildurl('/user' + path, queryMap);
  }

  findUsers(query: string, status: string, page: number, pageSize: number) {
    const q = {
      query,
      status,
      page,
      page_size: pageSize,
    };
    const url = this.buildurl('/users', q);
    return this.http.fget(url);
  }

  getUser(id: number) {
    const url = this.buildurl(`/user/${id}`);
    return this.http.fget(url);
  }
}
