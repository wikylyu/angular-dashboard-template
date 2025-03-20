import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../../services/admin.service';
import { AdminApiService } from '../../../services/apis/admin-api.service';
import { ApiException } from '../../../services/apis/api.interceptor';
import { ApiStatus } from '../../../services/apis/status';
import { TitleService } from '../../../services/title.service';
import { validateFormGroup } from '../../../utils/form';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzIconModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  formGroup: FormGroup;
  constructor(
    private title: TitleService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private adminApi: AdminApiService,
    private message: NzMessageService
  ) {
    this.title.setTitle('登录');
    this.formGroup = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.adminService.config()?.admin_username_pattern || ''
          ),
        ],
      ],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  get appname() {
    return this.adminService.config()?.name || 'App';
  }

  loading: boolean = false;
  async submit() {
    const value = validateFormGroup(this.formGroup);
    if (!value) {
      return;
    }
    try {
      this.loading = true;
      await this.adminApi.login({
        username: value.username,
        password: value.password,
        remember: value.remember,
      });
    } catch (error) {
      if (error instanceof ApiException) {
        if (error.status === ApiStatus.ADMIN_USER_NOT_FOUND) {
          this.message.warning('账号不存在');
        } else if (error.status === ApiStatus.ADMIN_USER_PASSWORD_INCORRECT) {
          this.message.warning('密码错误');
        } else if (error.status === ApiStatus.ADMIN_USER_BANNED) {
          this.message.warning('账号已被封禁');
        } else {
          this.message.warning('未知错误');
        }
      }
    } finally {
      this.loading = false;
    }
  }
}
