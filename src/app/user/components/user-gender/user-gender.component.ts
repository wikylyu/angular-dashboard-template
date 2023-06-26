import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-gender',
  templateUrl: './user-gender.component.html',
  styleUrls: ['./user-gender.component.scss'],
})
export class UserGenderComponent {
  @Input() gender = '';

  color() {
    const m: any = {
      Male: 'skyblue',
      Female: 'hotpink',
    };
    return m[this.gender] || 'error';
  }

  type() {
    const m: any = {
      Male: 'man',
      Female: 'woman',
    };
    return m[this.gender] || 'error';
  }
}
