import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { BaseModule } from '../base/base.module';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { UserLabelComponent } from './components/user-label/user-label.component';
import { UserStatusSelectComponent } from './components/user-status-select/user-status-select.component';
import { UserGenderComponent } from './components/user-gender/user-gender.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

@NgModule({
  declarations: [
    UserListPageComponent,
    UserStatusComponent,
    UserLabelComponent,
    UserStatusSelectComponent,
    UserGenderComponent,
    UserAvatarComponent,
  ],
  imports: [CommonModule, BaseModule],
})
export class UserModule {}
