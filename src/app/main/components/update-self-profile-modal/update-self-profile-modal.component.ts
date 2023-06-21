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
  selector: 'app-update-self-profile-modal',
  templateUrl: './update-self-profile-modal.component.html',
  styleUrls: ['./update-self-profile-modal.component.scss'],
})
export class UpdateSelfProfileModalComponent implements OnInit, OnChanges {
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<any>();

  @Input() data: any = {};

  formGroup!: UntypedFormGroup;
  constructor(
    private api: StaffApiService,
    private message: NzMessageService,
    private fb: UntypedFormBuilder
  ) {
    this.formGroup = this.fb.group({
      username: [''],
      name: ['', [Validators.required]],
      phone: [''],
      email: [''],
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

  loading = false;
  async onOk() {
    if (!validateFormGroup(this.formGroup)) {
      return;
    }
    const value = this.formGroup.value;
    try {
      this.loading = true;
      const r = await this.api.updateSelf(value.name, value.phone, value.email);
      if (r.status !== 0) {
        this.message.warning('未知错误');
      } else {
        this.message.success('更新成功');
        this.close();
        this.update.emit(r.data);
      }
    } catch (error) {
      this.message.error('网络错误');
    } finally {
      this.loading = false;
    }
  }
}
