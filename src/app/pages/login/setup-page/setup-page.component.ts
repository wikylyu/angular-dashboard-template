import { Component } from '@angular/core';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-setup-page',
  imports: [],
  templateUrl: './setup-page.component.html',
  styleUrl: './setup-page.component.scss',
})
export class SetupPageComponent {
  constructor(private title: TitleService) {
    this.title.setTitle('创建管理员账户');
  }
}
