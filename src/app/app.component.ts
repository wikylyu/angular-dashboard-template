import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AdminService } from './services/admin.service';
import { AdminApiService } from './services/apis/admin-api.service';

@Component({
  selector: 'main[app-root]',
  imports: [RouterOutlet, NzSpinModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private adminApi: AdminApiService
  ) {}

  ngOnInit(): void {
    this.check();
  }

  async check() {
    try {
      this.loading = true;
      const cfg = await this.adminService.getAdminConfig();
      console.log(cfg);
      if (!cfg) {
        this.router.navigate(['/error'], { replaceUrl: true });
        return;
      }
      if (this.router.url === '/error') {
        this.router.navigate(['/'], { replaceUrl: true });
      }
      if (cfg.onboarding) {
        this.router.navigate(['/setup'], { replaceUrl: true });
        return;
      }
      await this.adminService.getProfile(); // 获取登录信息成功，跳转到 dashboard，否则会自动跳转到login
      if (this.router.url.split('?')[0] === '/') {
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }
}
