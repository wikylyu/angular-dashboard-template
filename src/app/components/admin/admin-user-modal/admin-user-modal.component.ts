import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { AdminUser } from '../../../models/admin';
import { AdminUserLabelComponent } from '../admin-user-label/admin-user-label.component';
import { AdminUserRolesComponent } from '../admin-user-roles/admin-user-roles.component';
import { AdminUserStatusComponent } from '../admin-user-status/admin-user-status.component';

@Component({
  selector: 'app-admin-user-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzDescriptionsModule,
    AdminUserStatusComponent,
    AdminUserLabelComponent,
    DatePipe,
    AdminUserRolesComponent,
  ],
  templateUrl: './admin-user-modal.component.html',
  styleUrl: './admin-user-modal.component.scss',
})
export class AdminUserModalComponent {
  constructor(
    private modalRef: NzModalRef<AdminUserModalComponent>,
    @Inject(NZ_MODAL_DATA) public data: AdminUser
  ) {}

  close(r: any = null) {
    this.modalRef.close(r);
  }
}
