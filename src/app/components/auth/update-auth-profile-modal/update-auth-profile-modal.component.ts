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
import { AuthApiService } from '../../../services/apis/auth-api.service';
import { AuthService } from '../../../services/auth.service';
import { validateFormGroup } from '../../../utils/form';

@Component({
  selector: 'app-update-auth-profile-modal',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
  ],
  templateUrl: './update-auth-profile-modal.component.html',
  styleUrl: './update-auth-profile-modal.component.scss',
})
export class UpdateAuthProfileModalComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private modalRef: NzModalRef<UpdateAuthProfileModalComponent>,
    private authService: AuthService,
    private fb: FormBuilder,
    private authApi: AuthApiService,
    private messageService: NzMessageService
  ) {
    this.formGroup = this.fb.group({
      username: [{ value: '', disabled: true }, [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', []],
      email: ['', []],
    });
    effect(() => {
      const profile = authService.profile();
      this.formGroup.patchValue({
        username: profile?.username || '',
        name: profile?.name || '',
        phone: profile?.phone || '',
        email: profile?.email || '',
      });
    });
  }

  ngOnInit(): void {
    this.authService.getProfile();
  }

  close(r: any = null) {
    this.modalRef.close(r);
  }

  loading: boolean = false;
  async submit() {
    const value = validateFormGroup(this.formGroup);
    if (!value) {
      return;
    }
    try {
      this.loading = true;
      const r = await this.authApi.updateProfile({
        name: value.name,
        email: value.email,
        phone: value.phone,
      });
      this.authService.profile.set(r);
      this.close(r);
      this.messageService.success('保存成功');
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
