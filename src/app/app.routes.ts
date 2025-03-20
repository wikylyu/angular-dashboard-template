import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page/dashboard-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { SetupPageComponent } from './pages/login/setup-page/setup-page.component';

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
    pathMatch: 'full',
    component: DashboardPageComponent,
  },
];
