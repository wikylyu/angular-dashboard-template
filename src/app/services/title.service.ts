import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private configService: ConfigService, private title: Title) {}

  setTitle(title: string) {
    const appname = this.configService.config()?.appname || 'App';
    if (!title) {
      title = appname;
    } else {
      title = `${title} - ${appname}`;
    }
    this.title.setTitle(title);
  }
}
