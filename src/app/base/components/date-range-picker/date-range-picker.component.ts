import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defaultRanges } from 'src/app/utils/datetime';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit {
  @Input() label = '时间';

  @Input() value: any[] = [];
  @Output() valueChange = new EventEmitter<any[]>();

  constructor() {}

  ranges = defaultRanges();

  ngOnInit(): void {}

  onChange() {
    this.value = this.value || [];
    this.valueChange.emit(this.value);
  }
}
