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
import { AdminService } from '../../../services/admin.service';
import { AdminApiService } from '../../../services/apis/admin-api.service';
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
    private adminService: AdminService,
    private adminApi: AdminApiService,
    private message: NzMessageService,
    private router: Router
  ) {
    this.title.setTitle('创建管理员账户');

    this.formGroup = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(
            this.adminService.config()?.admin_username_pattern || ''
          ),
        ],
      ],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get appname() {
    return this.adminService.config()?.appname || 'App';
  }

  loading: boolean = false;
  async submit() {
    const value = validateFormGroup(this.formGroup);
    if (!value || this.loading) {
      return;
    }
    try {
      this.loading = true;
      const r = await this.adminApi.createSuperuser({
        username: value.username,
        password: value.password,
        name: value.name,
      });
      console.log(r);
      this.message.success('创建成功，请登录');
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
