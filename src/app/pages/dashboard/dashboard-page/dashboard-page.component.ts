import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { PageAsideComponent } from '../../../components/layout/page-aside/page-aside.component';
import { PageHeaderComponent } from '../../../components/layout/page-header/page-header.component';
import { ConfigService } from '../../../services/config.service';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    RouterModule,
    PageHeaderComponent,
    PageAsideComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  isCollapsed: boolean = false;
  constructor(
    private title: TitleService,
    private configService: ConfigService
  ) {
    this.title.setTitle('欢迎');
  }

  get appname() {
    return this.configService.config()?.appname || 'App';
  }

  get copyright() {
    return this.configService.config()?.copyright || '';
  }

  ngOnInit(): void {}
}
