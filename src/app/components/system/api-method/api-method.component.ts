import { Component, Input } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-api-method',
  imports: [NzTagModule],
  templateUrl: './api-method.component.html',
  styleUrl: './api-method.component.scss',
})
export class ApiMethodComponent {
  @Input({ required: true }) method: string = '';

  get color() {
    switch (this.method) {
      case 'GET':
        return '#2db7f5';
      case 'POST':
        return '#87d068';
      case 'PUT':
        return '#108ee9';
      case 'DELETE':
        return '#f50';
      default:
        return 'error';
    }
  }
}
