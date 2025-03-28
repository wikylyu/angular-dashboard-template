import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { PermsDirective } from '../../../directives/perms.directive';
import { SaveMenuOpenStateDirective } from '../../../directives/save-menu-open-state.directive';
import { AuthService } from '../../../services/auth.service';

interface AsideMenu {
  name: string;
  icon: string;
  link: string;
  items: AsideMenuItem[];
  is_superuser?: boolean;
  permissions?: string[];
}

interface AsideMenuItem {
  name: string;
  link: string;
  permission?: string;
}

@Component({
  selector: 'aside[app-page-aside]',
  imports: [
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NgClass,
    RouterModule,
    SaveMenuOpenStateDirective,
    PermsDirective,
  ],
  templateUrl: './page-aside.component.html',
  styleUrl: './page-aside.component.scss',
})
export class PageAsideComponent {
  isCollapsed: boolean = false;

  constructor(private authService: AuthService) {}

  get profile() {
    return this.authService.profile();
  }

  menus: AsideMenu[] = [
    {
      name: '账号管理',
      icon: 'usergroup-add',
      link: '/admin',
      items: [
        {
          name: '账号列表',
          link: '/users',
          permission: 'admin.user.menu',
        },
        { name: '角色管理', link: '/roles', permission: 'admin.role.menu' },
      ],
    },
    {
      name: '系统管理',
      icon: 'setting',
      link: '/system',
      is_superuser: true,
      items: [
        {
          name: '接口列表',
          link: '/apis',
        },
        {
          name: '权限设置',
          link: '/permissions',
        },
      ],
    },
  ];

  getAsideMenuPermissions(m: AsideMenu): string[] {
    if (m.permissions === undefined) {
      // 防止重复检查导致重复请求
      m.permissions = [];
      for (const item of m.items) {
        if (item.permission) {
          m.permissions.push(item.permission);
        }
      }
    }
    return m.permissions;
  }
}
