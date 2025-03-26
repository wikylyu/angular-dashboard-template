import { Routes } from '@angular/router';
import { AdminRoleListPageComponent } from './pages/admin/admin-role-list-page/admin-role-list-page.component';
import { AdminUserListPageComponent } from './pages/admin/admin-user-list-page/admin-user-list-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { SetupPageComponent } from './pages/auth/setup-page/setup-page.component';
import { DashboardOverviewPageComponent } from './pages/dashboard/dashboard-overview-page/dashboard-overview-page.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page/dashboard-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ApiListPageComponent } from './pages/system/api-list-page/api-list-page.component';
import { PermissionsPageComponent } from './pages/system/permissions-page/permissions-page.component';

export const routes: Routes = [
  {
    path: 'error',
    pathMatch: 'full',
    component: ErrorPageComponent,
  },
  { path: 'login', pathMatch: 'full', component: LoginPageComponent },
  {
    path: 'setup',
    pathMatch: 'full',
    component: SetupPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        pathMatch: 'full',
        component: DashboardOverviewPageComponent,
      },
      {
        path: 'admin',
        children: [
          {
            path: 'users',
            pathMatch: 'full',
            component: AdminUserListPageComponent,
          },
          {
            path: 'roles',
            pathMatch: 'full',
            component: AdminRoleListPageComponent,
          },
        ],
      },
      {
        path: 'system',
        children: [
          {
            path: 'apis',
            pathMatch: 'full',
            component: ApiListPageComponent,
          },
          {
            path: 'permissions',
            pathMatch: 'full',
            component: PermissionsPageComponent,
          },
        ],
      },
    ],
  },
];
