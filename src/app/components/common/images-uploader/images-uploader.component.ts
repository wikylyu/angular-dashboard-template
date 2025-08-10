import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  CloseOutline,
  DeleteOutline,
  EyeOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzImage, NzImageModule, NzImageService } from 'ng-zorro-antd/image';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FileurlPipe } from '../../../pipes/fileurl.pipe';
import { FileApiService } from '../../../services/apis/file-api.service';
import { removeItemInArray } from '../../../utils/array';
@Component({
  selector: 'app-images-uploader',
  imports: [
    NzModalModule,
    NzSpinModule,
    NgOptimizedImage,
    FileurlPipe,
    NzIconModule,
    NzImageModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './images-uploader.component.html',
  styleUrl: './images-uploader.component.scss',
  providers: [
    {
      provide: NZ_ICONS,
      useValue: [PlusOutline, CloseOutline, DeleteOutline, EyeOutline],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ImagesUploaderComponent,
    },
  ],
})
export class ImagesUploaderComponent implements ControlValueAccessor {
  values: string[] = [];
  loading = false;
  @Input() maxSize = 10;

  constructor(
    private modalService: NzModalService,
    private fileApi: FileApiService,
    private imageService: NzImageService
  ) {}

  onFileSelected(e: any) {
    if (this.loading) {
      return;
    }
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    this.uploadFiles(files);
  }
  async uploadFiles(files: File[]) {
    try {
      this.loading = true;
      for (const file of files) {
        const r = await this.fileApi.upload(file);
        this.values.push(r.id);
      }
    } catch (error) {
    } finally {
      this.loading = false;
      this.onFormChange(this.values);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.values, event.previousIndex, event.currentIndex);
    this.onFormChange(this.values);
  }

  remove(i: number) {
    this.values = removeItemInArray(this.values, i);
    this.onFormChange(this.values);
  }

  view(i: number) {
    const images: NzImage[] = [{ src: this.fileApi.fileurl(this.values[i]) }];
    // for (const value of this.values) {
    //   images.push({
    //     src: this.fileApi.fileurl(value),
    //   });
    // }
    this.imageService.preview(images);
  }

  writeValue(v: string[]) {
    this.values = v;
  }

  onFormChange = (v: any) => {};

  onFormTouched = () => {};

  registerOnChange(onChange: any) {
    this.onFormChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onFormTouched = onTouched;
  }

  disabled = false;
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
