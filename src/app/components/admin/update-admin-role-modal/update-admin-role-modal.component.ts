import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { AdminRole } from '../../../models/admin';
import { AdminApiService } from '../../../services/apis/admin-api.service';
import { validateFormGroup } from '../../../utils/form';
import { PermissionMultipleCheckerComponent } from '../../system/permission-multiple-checker/permission-multiple-checker.component';

@Component({
  selector: 'app-update-admin-role-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    PermissionMultipleCheckerComponent,
  ],
  templateUrl: './update-admin-role-modal.component.html',
  styleUrl: './update-admin-role-modal.component.scss',
})
export class UpdateAdminRoleModalComponent {
  formGroup: FormGroup;
  loading: boolean = false;
  constructor(
    private modalRef: NzModalRef<UpdateAdminRoleModalComponent>,
    @Inject(NZ_MODAL_DATA) public data: AdminRole | undefined,
    private adminApi: AdminApiService,
    private fb: FormBuilder,
    private messageService: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      name: [data?.name || '', [Validators.required]],
      remark: [data?.remark || ''],
      permission_ids: [data?.permission_ids || []],
    });
  }

  close(r: any = null) {
    this.modalRef.close(r);
  }

  async submit() {
    const values = validateFormGroup(this.formGroup);
    if (!values) {
      return;
    }
    try {
      this.loading = true;
      var r: AdminRole | null = null;
      if (this.data?.id) {
        r = await this.adminApi.updateAdminRole(this.data!.id, {
          name: values.name,
          remark: values.remark,
          permission_ids: values.permission_ids,
        });
        this.messageService.success('更新成功');
      } else {
        r = await this.adminApi.createAdminRole({
          name: values.name,
          remark: values.remark,
          permission_ids: values.permission_ids,
        });
        this.messageService.success('创建成功');
      }
      this.close(r);
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
