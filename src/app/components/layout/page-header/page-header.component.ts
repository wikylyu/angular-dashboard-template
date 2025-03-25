import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AdminService } from '../../../services/admin.service';
import { AdminAccountMenuButtonComponent } from '../../admin/admin-account-menu-button/admin-account-menu-button.component';

@Component({
  selector: 'header[app-page-header]',
  imports: [
    NgOptimizedImage,
    AdminAccountMenuButtonComponent,
    NzTagModule,
    RouterModule,
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  constructor(private adminService: AdminService) {}

  get appname() {
    return this.adminService.config()?.appname || 'App';
  }

  get version() {
    return this.adminService.config()?.version;
  }
}
