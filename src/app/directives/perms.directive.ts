import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appPerms]',
})
export class PermsDirective {
  @Input({ required: true }) set appPerms(codes: string[]) {
    this.checkPermissions(codes);
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}
  async checkPermissions(codes: string[]) {
    if (codes.length === 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }
    try {
      this.viewContainer.clear();
      const perms = await this.authService.checkPermissions(codes);
      this.updateView(perms);
    } catch (error) {}
  }

  private updateView(perms: Record<string, boolean>) {
    for (const code in perms) {
      if (perms[code]) {
        // 只要包含一个权限就可以
        this.viewContainer.createEmbeddedView(this.templateRef);
        return;
      }
    }
  }
}
