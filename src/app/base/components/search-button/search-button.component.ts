import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss'],
})
export class SearchButtonComponent implements OnInit {
  @Input() loading = false;
  @Output() search = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  click() {
    this.search.emit(null);
  }
}
