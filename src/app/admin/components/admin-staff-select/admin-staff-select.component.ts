import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-staff-select',
  templateUrl: './admin-staff-select.component.html',
  styleUrls: ['./admin-staff-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AdminStaffSelectComponent,
    },
  ],
})
export class AdminStaffSelectComponent implements OnInit, ControlValueAccessor {
  value = 0;
  @Input() label = '人员';

  options: any = [];
  loading = false;

  constructor(
    private api: AdminApiService,
    private message: NzMessageService
  ) {}

  ngOnInit() {}

  update() {
    if (this.value > 0) {
      for (const o of this.options) {
        if (o.id === this.value) {
          return;
        }
      }
      this.getAdminStaff(this.value);
    }
  }

  onChange() {
    this.value = this.value || 0;
    this.onFormChange(this.value);
  }

  async search(query: string) {
    try {
      this.loading = true;
      const r = await this.api.findAdminStaffs(query, '', 1, 20);
      this.options = r.data.list;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  async getAdminStaff(id: number) {
    try {
      this.loading = true;
      const r = await this.api.getAdminStaff(id);
      if (r.data) {
        this.options = [r.data];
      }
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  writeValue(v: any) {
    this.value = v;
    this.update();
  }

  onFormChange = (v: any) => {};

  onFormTouched = () => {};

  registerOnChange(onChange: any) {
    this.onFormChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onFormTouched = onTouched;
  }
}
