import { Injectable, signal } from '@angular/core';
import { Config } from '../models/base';
import { BaseApiService } from './apis/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config = signal<Config | null>(null);

  constructor(private baseApi: BaseApiService) {}

  async getConfig(): Promise<Config | null> {
    try {
      const r = await this.baseApi.getConfig();
      this.config.set(r);
      return r;
    } catch (error) {}
    return null;
  }
}
