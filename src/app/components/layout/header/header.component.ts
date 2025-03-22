import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { AdminAccountMenuButtonComponent } from '../../admin/admin-account-menu-button/admin-account-menu-button.component';

@Component({
  selector: 'header[app-header]',
  imports: [NgOptimizedImage, AdminAccountMenuButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private adminService: AdminService) {}

  get appname() {
    return this.adminService.config()?.appname || 'App';
  }
}
