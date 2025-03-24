import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';
import { NzAffixModule } from 'ng-zorro-antd/affix';

@Component({
  selector: 'app-actionbar',
  imports: [NgTemplateOutlet, NzAffixModule],
  templateUrl: './actionbar.component.html',
  styleUrl: './actionbar.component.scss',
})
export class ActionbarComponent {
  @ContentChild('right') right: TemplateRef<any> | null = null;
}
