import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-error-page',
  imports: [NzButtonModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('服务不可用');
  }
}
