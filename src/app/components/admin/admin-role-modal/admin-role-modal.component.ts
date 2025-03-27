import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { AdminRole } from '../../../models/admin';
import { PermissionsViewComponent } from '../../system/permissions-view/permissions-view.component';
import { AdminUserLabelComponent } from '../admin-user-label/admin-user-label.component';

@Component({
  selector: 'app-admin-role-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzDescriptionsModule,
    AdminUserLabelComponent,
    DatePipe,
    PermissionsViewComponent,
    FormsModule,
  ],
  templateUrl: './admin-role-modal.component.html',
  styleUrl: './admin-role-modal.component.scss',
})
export class AdminRoleModalComponent {
  constructor(
    private modalRef: NzModalRef<AdminRoleModalComponent>,
    @Inject(NZ_MODAL_DATA) public data: AdminRole
  ) {}

  close(r: any = null) {
    this.modalRef.close(r);
  }
}
