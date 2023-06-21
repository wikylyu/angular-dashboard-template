import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Input() text: any;

  datetime: Date | null = new Date(0);

  constructor() {}

  init() {
    if (!this.text) {
      this.datetime = null;
      return;
    }
    if (typeof this.text === 'string') {
      this.datetime = new Date(this.text);
    } else if (typeof this.text === 'number') {
      this.datetime = new Date(this.text * 1000);
    } else if (this.text instanceof Date) {
      this.datetime = new Date(this.text);
    }
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }
}
