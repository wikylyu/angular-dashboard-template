import { Directive, HostListener, OnInit } from '@angular/core';
import { NzSubMenuComponent } from 'ng-zorro-antd/menu';

@Directive({
  selector: '[appSaveMenuOpenState]',
})
export class SaveMenuOpenStateDirective implements OnInit {
  constructor(private submenu: NzSubMenuComponent) {}

  get key() {
    if (!this.submenu.nzIcon) {
      return null;
    }
    return 'menu.' + this.submenu.nzIcon;
  }

  ngOnInit() {
    // 从 localStorage 读取状态并应用到 nzOpen
    if (!this.key) {
      return;
    }
    const savedState = localStorage.getItem(this.key);
    this.submenu.nzOpen = savedState === 'true';
  }

  // 监听 nzOpen 变化
  @HostListener('nzOpenChange', ['$event'])
  onOpenChange(open: Event) {
    if (!this.key) {
      return;
    }
    // 使用 submenu 的 nzIcon 作为 key 保存状态
    localStorage.setItem(this.key, open ? 'true' : 'false');
  }
}
