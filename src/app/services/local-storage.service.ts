import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public setJson(key: string, value: any) {
    const v = JSON.stringify(value);
    this.set(key, v);
  }

  public get(key: string): string | null {
    return localStorage.getItem(key);
  }

  public getJson(key: string): any {
    const v = this.get(key);
    if (v) {
      return JSON.parse(v);
    }
    return null;
  }
}
