import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CaptchaInputComponent } from '../../../components/common/captcha-input/captcha-input.component';
import { ApiException } from '../../../services/apis/api.interceptor';
import { AuthApiService } from '../../../services/apis/auth-api.service';
import { ApiStatus } from '../../../services/apis/status';
import { AuthService } from '../../../services/auth.service';
import { ConfigService } from '../../../services/config.service';
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
    CaptchaInputComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  formGroup: FormGroup;
  r: string = '/dashboard';
  constructor(
    private title: TitleService,
    private fb: FormBuilder,
    private authService: AuthService,
    private configService: ConfigService,
    private authApi: AuthApiService,
    private messageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.title.setTitle('登录');
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
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      remember: [false],
    });
    this.route.queryParams.subscribe((params) => {
      this.r = params['r'] || '/dashboard';
    });
  }

  captchaDate: Date = new Date();

  get captchaUrl() {
    return this.authApi.loginCaptchaUrl;
  }

  get appname() {
    return this.configService.config()?.appname || 'App';
  }

  get copyright() {
    return this.configService.config()?.copyright || '';
  }

  loading: boolean = false;
  async submit() {
    const value = validateFormGroup(this.formGroup);
    if (!value || this.loading) {
      return;
    }
    try {
      this.loading = true;
      await this.authApi.login({
        username: value.username,
        password: value.password,
        remember: value.remember,
        captcha: value.captcha,
      });
      this.afterLogin();
    } catch (error) {
      if (error instanceof ApiException) {
        if (error.status === ApiStatus.ADMIN_USER_NOT_FOUND) {
          this.messageService.warning('账号不存在');
        } else if (error.status === ApiStatus.ADMIN_USER_PASSWORD_INCORRECT) {
          this.messageService.warning('密码错误');
        } else if (error.status === ApiStatus.ADMIN_USER_BANNED) {
          this.messageService.warning('账号已被封禁');
        } else if (error.status === ApiStatus.ADMIN_CAPTCHA_INCORRECT) {
          this.messageService.warning('验证码错误');
          this.captchaDate = new Date();
        } else {
          this.messageService.warning('未知错误');
        }
      }
    } finally {
      this.loading = false;
    }
  }

  afterLogin() {
    try {
      if (this.r && this.r.split('?')[0] !== '/') {
        this.router.navigateByUrl(this.r, { replaceUrl: true });
        return;
      }
    } catch (error) {}
    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }
}
