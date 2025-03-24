import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-content',
  imports: [NzBreadCrumbModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnChanges {
  @Input({ required: true }) breadCrumbs: string[] = [];

  constructor(private title: TitleService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['breadCrumbs']) {
      const breadCrumbs = [...changes['breadCrumbs'].currentValue].reverse();
      this.title.setTitle(breadCrumbs.join(' | '));
    }
  }
}
