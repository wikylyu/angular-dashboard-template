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
import { ApiException } from '../../../services/apis/api.interceptor';
import { AuthApiService } from '../../../services/apis/auth-api.service';
import { ApiStatus } from '../../../services/apis/status';
import { validateFormGroup } from '../../../utils/form';
import { CaptchaInputComponent } from '../../common/captcha-input/captcha-input.component';

@Component({
  selector: 'app-update-auth-password-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    CaptchaInputComponent,
  ],
  templateUrl: './update-auth-password-modal.component.html',
  styleUrl: './update-auth-password-modal.component.scss',
})
export class UpdateAuthPasswordModalComponent {
  formGroup: FormGroup;
  constructor(
    private modalRef: NzModalRef<UpdateAuthPasswordModalComponent>,
    private fb: FormBuilder,
    private authApi: AuthApiService,
    private messageService: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
      captcha: ['', [Validators.required]],
    });
  }

  captchaDate: Date = new Date();

  get captchaUrl() {
    return this.authApi.passwordCaptcahaUrl;
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
  async submit() {
    const value = validateFormGroup(this.formGroup);
    if (!value) {
      return;
    }
    try {
      this.loading = true;
      const r = await this.authApi.updatePassword({
        password: value.password,
        captcha: value.captcha,
      });
      this.messageService.success('修改成功');
      this.close(r);
    } catch (error) {
      if (error instanceof ApiException) {
        if (error.status === ApiStatus.ADMIN_CAPTCHA_INCORRECT) {
          this.messageService.warning('验证码错误');
          this.captchaDate = new Date();
        }
      }
    } finally {
      this.loading = false;
    }
  }
}
