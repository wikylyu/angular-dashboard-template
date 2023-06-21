import {
  Component,
  ContentChildren,
  Directive,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Directive({ selector: 'app-sidemenu-item' })
export class SidemenuItemDirective {
  @Input() title: string = '';
  @Input() link = '';
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  @Input() title = '';
  @Input() icon = '';
  @Input() baseURL = '';

  @ContentChildren(SidemenuItemDirective)
  items!: QueryList<SidemenuItemDirective>;

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.initMenu();
  }

  open: boolean = false;
  initMenu() {
    this.open = this.localStorage.get('menu.' + this.title) == 'true';
  }

  onMenuOpenChange(b: boolean) {
    this.open = b;
    this.localStorage.set('menu.' + this.title, `${b}`);
  }
}
