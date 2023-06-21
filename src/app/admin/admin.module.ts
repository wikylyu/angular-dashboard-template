import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BaseModule } from '../base/base.module';
import { AdminStaffListPageComponent } from './pages/admin-staff-list-page/admin-staff-list-page.component';
import { AdminStaffStatusComponent } from './components/admin-staff-status/admin-staff-status.component';
import { AdminStaffStatusSelectComponent } from './components/admin-staff-status-select/admin-staff-status-select.component';
import { AdminStaffLabelComponent } from './components/admin-staff-label/admin-staff-label.component';
import { UpdateAdminStaffModalComponent } from './components/update-admin-staff-modal/update-admin-staff-modal.component';
import { UpdateAdminStaffPasswordModalComponent } from './components/update-admin-staff-password-modal/update-admin-staff-password-modal.component';
import { AdminStaffTokenListPageComponent } from './pages/admin-staff-token-list-page/admin-staff-token-list-page.component';
import { AdminStaffSelectComponent } from './components/admin-staff-select/admin-staff-select.component';
import { AdminStaffTokenStatusSelectComponent } from './components/admin-staff-token-status-select/admin-staff-token-status-select.component';
import { AdminStaffTokenStatusComponent } from './components/admin-staff-token-status/admin-staff-token-status.component';

@NgModule({
  declarations: [
    AdminStaffListPageComponent,
    AdminStaffStatusComponent,
    AdminStaffStatusSelectComponent,
    AdminStaffLabelComponent,
    UpdateAdminStaffModalComponent,
    UpdateAdminStaffPasswordModalComponent,
    AdminStaffTokenListPageComponent,
    AdminStaffSelectComponent,
    AdminStaffTokenStatusSelectComponent,
    AdminStaffTokenStatusComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, BaseModule],
  exports: [AdminStaffLabelComponent, AdminStaffSelectComponent],
})
export class AdminModule {}
