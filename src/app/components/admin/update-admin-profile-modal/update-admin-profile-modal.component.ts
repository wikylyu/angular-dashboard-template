import { Component, effect, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { AdminService } from '../../../services/admin.service';
import { AdminApiService } from '../../../services/apis/admin-api.service';
import { validateFormGroup } from '../../../utils/form';

@Component({
  selector: 'app-update-admin-profile-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
  ],
  templateUrl: './update-admin-profile-modal.component.html',
  styleUrl: './update-admin-profile-modal.component.scss',
})
export class UpdateAdminProfileModalComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private modalRef: NzModalRef<UpdateAdminProfileModalComponent>,
    private adminService: AdminService,
    private fb: FormBuilder,
    private adminApi: AdminApiService,
    private message: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      username: [{ value: '', disabled: true }, [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', []],
      email: ['', []],
    });
    effect(() => {
      const profile = adminService.profile();
      this.formGroup.patchValue({
        username: profile?.username || '',
        name: profile?.name || '',
        phone: profile?.phone || '',
        email: profile?.email || '',
      });
    });
  }

  ngOnInit(): void {
    this.adminService.getProfile();
  }

  close(r: any = null) {
    this.modalRef.close(r);
  }

  loading: boolean = false;
  async save() {
    const value = validateFormGroup(this.formGroup);
    if (!value) {
      return;
    }
    try {
      this.loading = true;
      const r = await this.adminApi.updateProfile({
        name: value.name,
        email: value.email,
        phone: value.phone,
      });
      this.adminService.profile.set(r);
      this.close(r);
      this.message.success('保存成功');
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
