import { Component, Input } from '@angular/core';
import { StaffApiService } from 'src/app/services/staff-api.service';

@Component({
  selector: 'app-login-captcha',
  templateUrl: './login-captcha.component.html',
  styleUrls: ['./login-captcha.component.scss'],
})
export class LoginCaptchaComponent {
  @Input() t: number = 0;
  constructor(private api: StaffApiService) {}

  url() {
    return this.api.buildurl('/login/captcha', { _t: this.t });
  }

  refresh() {
    this.t = new Date().getTime();
  }
}
