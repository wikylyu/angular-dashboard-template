import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AsideComponent } from '../../../components/layout/aside/aside.component';
import { HeaderComponent } from '../../../components/layout/header/header.component';
import { AdminService } from '../../../services/admin.service';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    RouterModule,
    HeaderComponent,
    AsideComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  isCollapsed: boolean = false;
  constructor(private title: TitleService, private adminService: AdminService) {
    this.title.setTitle('欢迎');
  }

  get appname() {
    return this.adminService.config()?.appname || 'App';
  }

  get copyright() {
    return this.adminService.config()?.copyright || '';
  }

  ngOnInit(): void {}
}
