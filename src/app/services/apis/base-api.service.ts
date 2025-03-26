import { Injectable } from '@angular/core';
import { Config } from '../../models/base';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(private http: HttpService) {}

  getConfig(): Promise<Config> {
    const url = this.http.buildurl('/config');
    return this.http.fget(url);
  }
}
