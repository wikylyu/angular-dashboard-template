import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StaffApiService } from 'src/app/services/staff-api.service';
import { TitleService } from 'src/app/services/title.service';
import {
  nonEmptyValidator,
  usernameValidator,
  validateFormGroup,
} from 'src/app/utils/form';

@Component({
  selector: 'app-create-superuser-page',
  templateUrl: './create-superuser-page.component.html',
  styleUrls: ['./create-superuser-page.component.scss'],
})
export class CreateSuperuserPageComponent implements OnInit {
  formGroup: UntypedFormGroup;

  constructor(
    private title: TitleService,
    private fb: UntypedFormBuilder,
    private api: StaffApiService,
    private router: Router
  ) {
    this.title.setTitle('创建超级用户');

    this.formGroup = this.fb.group({
      username: ['', [Validators.minLength(4), usernameValidator]],
      name: ['', [nonEmptyValidator]],
      password: ['', [nonEmptyValidator, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.checkSuperuser();
  }

  async checkSuperuser() {
    try {
      const r = await this.api.checkSuperuser();
      if (r.data) {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    } catch (error) {}
  }

  submit() {
    if (!validateFormGroup(this.formGroup)) {
      return;
    }
    const value = this.formGroup.value;
    this.createSuperuser(value.name, value.username, value.password);
  }

  async createSuperuser(name: string, username: string, password: string) {
    try {
      const r = await this.api.createSuperuser(username, name, password);
      if (r.data) {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    } catch (error) {}
  }
}
