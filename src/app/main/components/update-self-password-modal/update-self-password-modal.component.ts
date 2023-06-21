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
import { StaffApiService } from 'src/app/services/staff-api.service';
import { validateFormGroup } from 'src/app/utils/form';

@Component({
  selector: 'app-update-self-password-modal',
  templateUrl: './update-self-password-modal.component.html',
  styleUrls: ['./update-self-password-modal.component.scss'],
})
export class UpdateSelfPasswordModalComponent implements OnInit, OnChanges {
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  loading = false;

  formGroup!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private api: StaffApiService,
    private message: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      old: ['', [Validators.required]],
      new1: [
        '',
        [Validators.required, Validators.pattern('^[0-9a-zA-Z@#$_d]{6,20}$')],
      ],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isVisible) {
      this.formGroup.reset();
    }
  }

  async onOk() {
    if (!validateFormGroup(this.formGroup)) {
      return;
    }
    const value = this.formGroup.value;
    try {
      this.loading = true;
      const r = await this.api.updateSelfPassword(value.old, value.new1);
      if (r.status === 1005) {
        this.message.warning('密码格式不合法');
      } else if (r.status === 1002) {
        this.message.warning('原密码错误');
      } else if (r.status !== 0) {
        this.message.warning('未知错误');
      } else {
        this.message.success('修改成功');
        this.close();
      }
    } catch (error) {
      this.message.error('网络错误');
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }
}
