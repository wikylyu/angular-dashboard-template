import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { removeItemInArray } from 'src/app/utils/array';

@Component({
  selector: 'app-string-array-input',
  templateUrl: './string-array-input.component.html',
  styleUrls: ['./string-array-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StringArrayInputComponent,
    },
  ],
})
export class StringArrayInputComponent implements ControlValueAccessor {
  @Input() label = '文本';
  messages: string[] = [];
  add() {
    this.messages.push('');
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onChange() {
    this.onFormChange(this.messages);
  }

  writeValue(v: any) {
    this.messages = v || [];
  }

  onFormChange = (v: any) => {};

  onFormTouched = () => {};

  registerOnChange(onChange: any) {
    this.onFormChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onFormTouched = onTouched;
  }

  remove(i: number) {
    this.messages = removeItemInArray(this.messages, i);
    this.onChange();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.messages, event.previousIndex, event.currentIndex);
    this.onChange();
  }
}
