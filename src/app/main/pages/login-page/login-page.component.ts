import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StaffApiService } from 'src/app/services/staff-api.service';
import { TitleService } from 'src/app/services/title.service';
import { nonEmptyValidator, validateFormGroup } from 'src/app/utils/form';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  formGroup: UntypedFormGroup;
  t: number = new Date().getTime();
  appName = environment.appName;
  constructor(
    private title: TitleService,
    private api: StaffApiService,
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {
    this.title.setTitle('登录');
    this.formGroup = this.fb.group({
      username: ['', [nonEmptyValidator]],
      password: ['', [nonEmptyValidator]],
      captcha: ['', [nonEmptyValidator]],
      remember: [false],
    });
  }

  submit() {
    if (!validateFormGroup(this.formGroup)) {
      return;
    }
    const value = this.formGroup.value;
    this.login(value.username, value.password, value.captcha, value.remember);
  }

  loading = false;
  async login(
    username: string,
    password: string,
    captcha: string,
    remember: boolean
  ) {
    try {
      this.loading = true;
      const r = await this.api.login(username, password, captcha, remember);
      if (r.status === 1001) {
        this.message.warning('账号不存在');
      } else if (r.status === 1002) {
        this.message.warning('密码错误');
      } else if (r.status === 1003) {
        this.message.warning('验证码错误');
      } else if (r.status === 1004) {
        this.message.warning('禁止登录');
      } else if (r.status !== 0) {
        this.message.warning('未知错误');
      } else {
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        return;
      }
      this.t = new Date().getTime();
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
