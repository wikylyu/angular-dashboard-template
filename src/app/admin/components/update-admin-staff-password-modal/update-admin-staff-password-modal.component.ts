import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { validateFormGroup } from 'src/app/utils/form';

@Component({
  selector: 'app-update-admin-staff-password-modal',
  templateUrl: './update-admin-staff-password-modal.component.html',
  styleUrls: ['./update-admin-staff-password-modal.component.scss'],
})
export class UpdateAdminStaffPasswordModalComponent
  implements OnInit, OnChanges
{
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Input() data: any = {};
  loading = false;

  formGroup!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private api: AdminApiService,
    private message: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.pattern('^[0-9a-zA-Z@#$_d]{6,20}$')],
      ],
      logout: [true],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isVisible) {
      this.formGroup.patchValue({ password: '', logout: true });
    }
  }

  close() {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }

  onOk() {
    if (!validateFormGroup(this.formGroup)) {
      return;
    }
    const value = this.formGroup.value;
    this.updateAdminStaffPassword(value.password, value.logout);
  }

  async updateAdminStaffPassword(password: string, logout: boolean) {
    try {
      this.loading = true;
      const r = await this.api.updateAdminStaffPassword(
        this.data.id,
        password,
        logout
      );
      if (r.status === 1005) {
        this.message.warning('密码格式不合法');
      } else if (r.status !== 0) {
        this.message.warning('未知错误');
      } else {
        this.message.success('修改成功');
        this.close();
      }
    } catch (e) {
    } finally {
      this.loading = false;
    }
  }
}
