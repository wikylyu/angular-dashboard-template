import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss'],
})
export class PageContentComponent implements OnChanges {
  @Input() breadcrumbs: string[] = [];

  constructor(private title: TitleService) {}

  ngOnChanges(): void {
    this.title.setRawTitle(this.breadcrumbs.join(' - '));
  }
}
