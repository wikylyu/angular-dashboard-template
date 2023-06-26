import { Component, Input, SimpleChange } from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
  styleUrls: ['./user-label.component.scss'],
})
export class UserLabelComponent {
  @Input() id = 0;

  constructor(private api: UserApiService) {}

  data: any = null;

  ngOnChanges(changes: SimpleChange): void {
    this.getUser();
  }

  async getUser() {
    if (!this.id) {
      this.data = null;
      return;
    }
    try {
      const r = await this.api.getUser(this.id);
      this.data = r.data;
    } catch (error) {}
  }
}
