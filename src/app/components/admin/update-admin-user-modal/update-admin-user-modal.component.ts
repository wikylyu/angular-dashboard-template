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
import { AdminUser } from '../../../models/admin';
import { AdminApiService } from '../../../services/apis/admin-api.service';
import { ConfigService } from '../../../services/config.service';
import { validateFormGroup } from '../../../utils/form';
import { AdminUserStatusSelectComponent } from '../admin-user-status-select/admin-user-status-select.component';

@Component({
  selector: 'app-update-admin-user-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    AdminUserStatusSelectComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './update-admin-user-modal.component.html',
  styleUrl: './update-admin-user-modal.component.scss',
})
export class UpdateAdminUserModalComponent {
  formGroup: FormGroup;
  loading: boolean = false;
  constructor(
    private modalRef: NzModalRef<UpdateAdminUserModalComponent>,
    @Inject(NZ_MODAL_DATA) private data: AdminUser,
    private fb: FormBuilder,
    private adminApi: AdminApiService,
    private configService: ConfigService,
    private messageService: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      username: [
        { value: data.username, disabled: true },
        [
          Validators.required,
          Validators.pattern(
            this.configService.config()?.admin_username_pattern || ''
          ),
        ],
      ],
      password: ['', []],
      status: [data.status, [Validators.required]],
      name: [data.name, [Validators.required]],
      email: [data.email, []],
      phone: [data.phone, []],
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
      const r = await this.adminApi.updateAdminUser(this.data.id, {
        password: values.password,
        name: values.name,
        email: values.email,
        phone: values.phone,
        status: values.status,
      });
      this.messageService.success('更新成功');
      this.close(r);
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
