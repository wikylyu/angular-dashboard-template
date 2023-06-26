import { Component, Input } from '@angular/core';
import { FileApiService } from 'src/app/services/file-api.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() avatar = '';

  constructor(private api: FileApiService) {}

  src() {
    return this.api.fileurl(this.avatar);
  }
}
