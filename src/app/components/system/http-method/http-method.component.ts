import { Component, Input } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-http-method',
  imports: [NzTagModule],
  templateUrl: './http-method.component.html',
  styleUrl: './http-method.component.scss',
})
export class HttpMethodComponent {
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
