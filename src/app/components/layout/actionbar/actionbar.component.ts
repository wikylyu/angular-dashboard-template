import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-actionbar',
  imports: [NgTemplateOutlet],
  templateUrl: './actionbar.component.html',
  styleUrl: './actionbar.component.scss',
})
export class ActionbarComponent {
  @ContentChild('right') right: TemplateRef<any> | null = null;
}
