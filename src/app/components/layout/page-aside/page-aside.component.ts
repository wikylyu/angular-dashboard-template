import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SaveMenuOpenStateDirective } from '../../../directives/save-menu-open-state.directive';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'aside[app-page-aside]',
  imports: [
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NgClass,
    RouterModule,
    SaveMenuOpenStateDirective,
  ],
  templateUrl: './page-aside.component.html',
  styleUrl: './page-aside.component.scss',
})
export class PageAsideComponent {
  isCollapsed: boolean = false;

  constructor(private adminService: AdminService) {}

  get profile() {
    return this.adminService.profile();
  }
}
