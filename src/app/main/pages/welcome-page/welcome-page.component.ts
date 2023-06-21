import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StaffApiService } from 'src/app/services/staff-api.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(
    private api: StaffApiService,
    private router: Router,
    private title: TitleService
  ) {
    this.title.setTitle('欢迎');
  }

  ngOnInit(): void {
    this.checkSuperuser();
  }

  async checkSuperuser() {
    try {
      const r = await this.api.checkSuperuser();
      if (!r.data) {
        this.router.navigateByUrl('/createsuperuser', { replaceUrl: true });
      } else {
        this.trySelf();
      }
    } catch (error) {}
  }

  async trySelf() {
    try {
      const r = await this.api.trySelf();
      if (r.data) {
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    } catch (error) {}
  }
}
