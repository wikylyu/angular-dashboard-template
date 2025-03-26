import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SaveMenuOpenStateDirective } from '../../../directives/save-menu-open-state.directive';
import { AuthService } from '../../../services/auth.service';

interface AsideMenu {
  name: string;
  icon: string;
  link: string;
  items: AsideMenuItem[];
  is_superuser?: boolean;
}

interface AsideMenuItem {
  name: string;
  link: string;
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
        },
        { name: '角色管理', link: '/roles' },
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
}
