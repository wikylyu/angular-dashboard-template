import { Component } from '@angular/core';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(private title: TitleService) {
    this.title.setTitle('登录');
  }
}
