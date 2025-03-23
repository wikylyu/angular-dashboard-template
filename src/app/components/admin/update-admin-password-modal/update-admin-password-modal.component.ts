import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { AdminApiService } from '../../../services/apis/admin-api.service';
import { ApiException } from '../../../services/apis/api.interceptor';
import { ApiStatus } from '../../../services/apis/status';
import { validateFormGroup } from '../../../utils/form';
import { CaptchaInputComponent } from '../../common/captcha-input/captcha-input.component';

@Component({
  selector: 'app-update-admin-password-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    CaptchaInputComponent,
  ],
  templateUrl: './update-admin-password-modal.component.html',
  styleUrl: './update-admin-password-modal.component.scss',
})
export class UpdateAdminPasswordModalComponent {
  formGroup: FormGroup;
  constructor(
    private modalRef: NzModalRef<UpdateAdminPasswordModalComponent>,
    private fb: FormBuilder,
    private adminApi: AdminApiService,
    private message: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
      captcha: ['', [Validators.required]],
    });
  }

  captchaDate: Date = new Date();

  get captchaUrl() {
    return this.adminApi.passwordCaptcahaUrl;
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = this.formGroup?.get('password')?.value;
    const confirmPassword = control.value;

    // 如果两个字段值不相同，返回错误对象
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  close(r: any = null) {
    this.modalRef.close(r);
  }

  loading: boolean = false;
  async save() {
    const value = validateFormGroup(this.formGroup);
    if (!value) {
      return;
    }
    try {
      this.loading = true;
      const r = await this.adminApi.updatePassword({
        password: value.password,
        captcha: value.captcha,
      });
      this.message.success('修改成功');
      this.close(r);
    } catch (error) {
      if (error instanceof ApiException) {
        if (error.status === ApiStatus.ADMIN_CAPTCHA_INCORRECT) {
          this.message.warning('验证码错误');
          this.captchaDate = new Date();
        }
      }
    } finally {
      this.loading = false;
    }
  }
}
