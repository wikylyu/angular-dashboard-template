import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-search-button',
  imports: [NzButtonModule, NzIconModule],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.scss',
})
export class SearchButtonComponent {
  @Input() loading: boolean = false;
  @Output() search = new EventEmitter<void>();
}
