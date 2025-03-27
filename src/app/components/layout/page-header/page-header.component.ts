import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ConfigService } from '../../../services/config.service';
import { AuthAccountMenuButtonComponent } from '../../auth/auth-account-menu-button/auth-account-menu-button.component';

@Component({
  selector: 'header[app-page-header]',
  imports: [
    NgOptimizedImage,
    AuthAccountMenuButtonComponent,
    NzTagModule,
    RouterModule,
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  constructor(private configService: ConfigService) {}

  get appname() {
    return this.configService.config()?.appname || 'App';
  }

  get version() {
    return this.configService.config()?.version;
  }
}
