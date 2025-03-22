import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private adminService: AdminService, private title: Title) {}

  setTitle(title: string) {
    const appname = this.adminService.config()?.appname || 'App';
    if (!title) {
      title = appname;
    } else {
      title = `${title} - ${appname}`;
    }
    this.title.setTitle(title);
  }
}
