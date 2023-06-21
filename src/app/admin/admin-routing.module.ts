import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStaffListPageComponent } from './pages/admin-staff-list-page/admin-staff-list-page.component';
import { AdminStaffTokenListPageComponent } from './pages/admin-staff-token-list-page/admin-staff-token-list-page.component';

const routes: Routes = [
  {
    path: 'staffs',
    component: AdminStaffListPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'staff/tokens',
    component: AdminStaffTokenListPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
