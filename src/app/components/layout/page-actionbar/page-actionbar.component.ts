import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';
import { NzAffixModule } from 'ng-zorro-antd/affix';

@Component({
  selector: 'app-page-actionbar',
  imports: [NgTemplateOutlet, NzAffixModule],
  templateUrl: './page-actionbar.component.html',
  styleUrl: './page-actionbar.component.scss',
})
export class PageActionbarComponent {
  @ContentChild('right') right: TemplateRef<any> | null = null;
}
