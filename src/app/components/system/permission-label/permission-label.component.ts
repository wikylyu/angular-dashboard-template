import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Permission } from '../../../models/system';
import { SystemApiService } from '../../../services/apis/system-api.service';

@Component({
  selector: 'app-permission-label',
  imports: [NzTagModule],
  templateUrl: './permission-label.component.html',
  styleUrl: './permission-label.component.scss',
})
export class PermissionLabelComponent implements OnChanges {
  @Input({ required: true }) id: number = 0;

  constructor(private systemApi: SystemApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getPermission();
  }

  perms: Permission[] = [];
  async getPermission() {
    this.perms = [];
    try {
      this.perms = await this.systemApi.getPermission(this.id);
    } catch (error) {}
  }
}
