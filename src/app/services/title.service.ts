import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private title: Title) {}

  setRawTitle(s: string) {
    this.title.setTitle(s);
  }

  setTitle(s: string) {
    this.title.setTitle(`${s} - ${environment.appName}`);
  }
}
