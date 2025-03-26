import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { AdminUserStatus } from '../../../models/admin';
import { AdminApiService } from '../../../services/apis/admin-api.service';
import { ConfigService } from '../../../services/config.service';
import { validateFormGroup } from '../../../utils/form';
import { AdminUserStatusSelectComponent } from '../admin-user-status-select/admin-user-status-select.component';

@Component({
  selector: 'app-create-admin-user-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzDividerModule,
    AdminUserStatusSelectComponent,
  ],
  templateUrl: './create-admin-user-modal.component.html',
  styleUrl: './create-admin-user-modal.component.scss',
})
export class CreateAdminUserModalComponent {
  formGroup: FormGroup;
  loading: boolean = false;
  constructor(
    private modalRef: NzModalRef<CreateAdminUserModalComponent>,
    private fb: FormBuilder,
    private configService: ConfigService,
    private messageService: NzMessageService,
    private adminApi: AdminApiService
  ) {
    this.formGroup = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.configService.config()?.admin_username_pattern || ''
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      status: [AdminUserStatus.ACTIVE, [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', []],
      phone: ['', []],
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
      const r = await this.adminApi.createAdminUser({
        username: values.username,
        password: values.password,
        name: values.name,
        email: values.email,
        phone: values.phone,
        status: values.status,
      });
      this.messageService.success('创建成功');
      this.close(r);
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
