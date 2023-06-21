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
  selector: 'app-update-admin-staff-modal',
  templateUrl: './update-admin-staff-modal.component.html',
  styleUrls: ['./update-admin-staff-modal.component.scss'],
})
export class UpdateAdminStaffModalComponent implements OnInit, OnChanges {
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Input() data: any = {};
  @Output() update = new EventEmitter<any>();

  loading = false;

  formGroup!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private api: AdminApiService,
    private message: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      username: ['', []],
      name: ['', [Validators.required]],
      phone: [''],
      email: [''],
      status: ['', [Validators.required]],
    });
    this.formGroup.controls['username'].disable();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isVisible) {
      this.formGroup.patchValue(this.data);
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
    this.updateAdminStaff(value.name, value.phone, value.email, value.status);
  }

  async updateAdminStaff(
    name: string,
    phone: string,
    email: string,
    status: string
  ) {
    try {
      this.loading = true;
      const r = await this.api.updateAdminStaff(
        this.data.id,
        name,
        phone,
        email,
        status
      );
      if (r.status !== 0) {
        this.message.warning('未知错误');
      } else {
        this.message.success('修改成功');
        this.close();
        this.update.emit(r.data);
      }
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
