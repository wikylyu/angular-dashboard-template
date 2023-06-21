import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-page-actionbar',
  templateUrl: './page-actionbar.component.html',
  styleUrls: ['./page-actionbar.component.scss'],
})
export class PageActionbarComponent {
  @ContentChild('right') right: TemplateRef<any> | null = null;
}
