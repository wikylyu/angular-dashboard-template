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
import { Permission } from '../../../models/system';
import { ApiException } from '../../../services/apis/api.interceptor';
import { ApiStatus } from '../../../services/apis/status';
import { SystemApiService } from '../../../services/apis/system-api.service';
import { validateFormGroup } from '../../../utils/form';
import { PermissionSelectComponent } from '../permission-select/permission-select.component';

@Component({
  selector: 'app-update-permission-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    PermissionSelectComponent,
  ],
  templateUrl: './update-permission-modal.component.html',
  styleUrl: './update-permission-modal.component.scss',
})
export class UpdatePermissionModalComponent {
  formGroup: FormGroup;
  constructor(
    private modalRef: NzModalRef<UpdatePermissionModalComponent>,
    @Inject(NZ_MODAL_DATA) public data: Permission | undefined,
    private fb: FormBuilder,
    private systemApi: SystemApiService,
    private message: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      name: [data?.name || '', [Validators.required]],
      code: [data?.code || '', [Validators.required]],
      parent_id: [data?.parent_id || 0, []],
      remark: [data?.remark || '', []],
    });
  }

  close(r: any = null) {
    this.modalRef.close(r);
  }

  onOk() {
    const values = validateFormGroup(this.formGroup);
    if (!values) {
      return;
    }

    if (this.data?.id) {
      this.updateAdminPermission(this.data?.id, values);
    } else {
      this.createAdminPermission(values);
    }
  }

  loading = false;
  async createAdminPermission(values: any) {
    try {
      this.loading = true;
      const r = await this.systemApi.createPermission({
        name: values.name,
        code: values.code,
        parent_id: values.parent_id,
        remark: values.remark,
      });
      this.message.success('创建成功');
      this.close(r);
    } catch (error) {
      if (error instanceof ApiException) {
        if (error.status === ApiStatus.PERMISSION_CODE_DUPLICATED) {
          this.message.warning('权限代码重复');
        } else if (error.status === ApiStatus.PERMISSION_PARENT_INVALID) {
          this.message.warning('无法设置子结点为自己的父权限');
        } else if (error.status !== ApiStatus.OK) {
          this.message.warning('未知错误');
        }
      }
    } finally {
      this.loading = false;
    }
  }

  async updateAdminPermission(id: number, values: any) {
    try {
      this.loading = true;
      const r = await this.systemApi.updatePermission(id, {
        name: values.name,
        code: values.code,
        parent_id: values.parent_id,
        remark: values.remark,
      });
      this.message.success('更新成功');
      this.close(r);
    } catch (error) {
      if (error instanceof ApiException) {
        if (error.status === ApiStatus.PERMISSION_CODE_DUPLICATED) {
          this.message.warning('权限代码重复');
        } else if (error.status === ApiStatus.PERMISSION_PARENT_INVALID) {
          this.message.warning('无法设置子结点为自己的父权限');
        } else if (error.status !== ApiStatus.OK) {
          this.message.warning('未知错误');
        }
      }
    } finally {
      this.loading = false;
    }
  }
}
