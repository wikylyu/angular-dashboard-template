import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './main/pages/welcome-page/welcome-page.component';
import { LoginPageComponent } from './main/pages/login-page/login-page.component';
import { CreateSuperuserPageComponent } from './main/pages/create-superuser-page/create-superuser-page.component';
import { DashboardPageComponent } from './main/pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'createsuperuser',
    component: CreateSuperuserPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin-routing.module').then(
            (m) => m.AdminRoutingModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user-routing.module').then((m) => m.UserRoutingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
