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
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { Api } from '../../../models/system';
import { ApiException } from '../../../services/apis/api.interceptor';
import { ApiStatus } from '../../../services/apis/status';
import { SystemApiService } from '../../../services/apis/system-api.service';
import { validateFormGroup } from '../../../utils/form';
import { ApiMethodSelectComponent } from '../api-method-select/api-method-select.component';
import { EndpointPathSelectComponent } from '../endpoint-path-select/endpoint-path-select.component';
import { PermissionMultipleSelectComponent } from '../permission-multiple-select/permission-multiple-select.component';

@Component({
  selector: 'app-update-api-modal',
  imports: [
    EndpointPathSelectComponent,
    ApiMethodSelectComponent,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    PermissionMultipleSelectComponent,
    NzModalModule,
  ],
  templateUrl: './update-api-modal.component.html',
  styleUrl: './update-api-modal.component.scss',
})
export class UpdateApiModalComponent {
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private systemApi: SystemApiService,
    private modalRef: NzModalRef<UpdateApiModalComponent>,
    private message: NzMessageService,
    @Inject(NZ_MODAL_DATA) public data: Api | undefined
  ) {
    this.formGroup = this.fb.group({
      method: [data?.method || '', [Validators.required]],
      path: [data?.path || '', [Validators.required]],
      permission_ids: [data?.permission_ids || [], []],
    });
  }

  close(r: any = null) {
    this.modalRef.close(r);
  }

  onOk() {
    const values = validateFormGroup(this.formGroup);
    console.log(values);
    if (!values) {
      return;
    }
    if (this.data?.id) {
      this.updateApi(values);
    } else {
      this.createApi(values);
    }
  }

  loading = false;
  async createApi(values: any) {
    try {
      this.loading = true;
      const r = await this.systemApi.createApi({
        method: values.method,
        path: values.path,
        permission_ids: values.permission_ids,
      });
      this.message.success('创建成功');
      this.close(r);
    } catch (error) {
      if (error instanceof ApiException) {
        if (error.status === ApiStatus.API_EXISTS) {
          this.message.warning('API已存在');
        } else if (error.status === ApiStatus.ENDPOINT_NOT_FOUND) {
          this.message.warning('路由不存在');
        } else if (error.status !== ApiStatus.OK) {
          this.message.warning('未知错误');
        }
      }
    } finally {
      this.loading = false;
    }
  }

  async updateApi(values: any) {
    try {
      this.loading = true;
      const r = await this.systemApi.updateApi(this.data!.id, {
        method: values.method,
        path: values.path,
        permission_ids: values.permission_ids,
      });
      this.message.success('更新成功');
      this.close(r);
    } catch (error) {
      if (error instanceof ApiException) {
        if (error.status === ApiStatus.API_EXISTS) {
          this.message.warning('API已存在');
        } else if (error.status === ApiStatus.ENDPOINT_NOT_FOUND) {
          this.message.warning('路由不存在');
        } else if (error.status !== ApiStatus.OK) {
          this.message.warning('未知错误');
        }
      }
    } finally {
      this.loading = false;
    }
  }
}
