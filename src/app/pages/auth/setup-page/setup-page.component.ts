import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthApiService } from '../../../services/apis/auth-api.service';
import { ConfigService } from '../../../services/config.service';
import { TitleService } from '../../../services/title.service';
import { validateFormGroup } from '../../../utils/form';

@Component({
  selector: 'app-setup-page',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzIconModule,
    NzAlertModule,
  ],
  templateUrl: './setup-page.component.html',
  styleUrl: './setup-page.component.scss',
})
export class SetupPageComponent {
  formGroup: FormGroup;
  constructor(
    private title: TitleService,
    private fb: FormBuilder,
    private configService: ConfigService,
    private messageService: NzMessageService,
    private router: Router,
    private authApi: AuthApiService
  ) {
    this.title.setTitle('创建管理员账户');

    this.formGroup = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(
            this.configService.config()?.admin_username_pattern || ''
          ),
        ],
      ],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get appname() {
    return this.configService.config()?.appname || 'App';
  }

  loading: boolean = false;
  async submit() {
    const value = validateFormGroup(this.formGroup);
    if (!value || this.loading) {
      return;
    }
    try {
      this.loading = true;
      const r = await this.authApi.createSuperuser({
        username: value.username,
        password: value.password,
        name: value.name,
      });
      this.messageService.success('创建成功，请登录');
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
