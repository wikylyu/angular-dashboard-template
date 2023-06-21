import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StaffApiService } from 'src/app/services/staff-api.service';
import { TitleService } from 'src/app/services/title.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  isCollapsed = false;
  self: any = {};
  headerTitle: string = environment.appName;
  constructor(
    private router: Router,
    private api: StaffApiService,
    private title: TitleService
  ) {
    this.title.setTitle('管理主页');
  }

  ngOnInit(): void {
    this.getSelf();
  }

  logoClick() {
    this.router.navigateByUrl('/dashboard');
  }

  async getSelf() {
    try {
      const r = await this.api.getSelf();
      this.self = r.data;
    } catch (error) {}
  }
}
