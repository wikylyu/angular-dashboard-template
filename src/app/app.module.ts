import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { WelcomePageComponent } from './main/pages/welcome-page/welcome-page.component';
import { LoginPageComponent } from './main/pages/login-page/login-page.component';
import { CreateSuperuserPageComponent } from './main/pages/create-superuser-page/create-superuser-page.component';
import { LoginCaptchaComponent } from './main/components/login-captcha/login-captcha.component';
import { DashboardPageComponent } from './main/pages/dashboard-page/dashboard-page.component';
import {
  SidemenuComponent,
  SidemenuItemDirective,
} from './main/components/sidemenu/sidemenu.component';
import { StaffAvatarMenuComponent } from './main/components/staff-avatar-menu/staff-avatar-menu.component';
import { UpdateSelfPasswordModalComponent } from './main/components/update-self-password-modal/update-self-password-modal.component';
import { UpdateSelfProfileModalComponent } from './main/components/update-self-profile-modal/update-self-profile-modal.component';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    LoginPageComponent,
    CreateSuperuserPageComponent,
    LoginCaptchaComponent,
    DashboardPageComponent,
    SidemenuComponent,
    StaffAvatarMenuComponent,
    SidemenuItemDirective,
    UpdateSelfPasswordModalComponent,
    UpdateSelfProfileModalComponent,
  ],
  imports: [BaseModule, AppRoutingModule, AdminModule, UserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
