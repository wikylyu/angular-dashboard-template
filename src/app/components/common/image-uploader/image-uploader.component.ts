import { NgOptimizedImage, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CloseOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzImage, NzImageModule, NzImageService } from 'ng-zorro-antd/image';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FileurlPipe } from '../../../pipes/fileurl.pipe';
import { FileApiService } from '../../../services/apis/file-api.service';
import { CropImageModalComponent } from '../crop-image-modal/crop-image-modal.component';
@Component({
  selector: 'app-image-uploader',
  imports: [
    NzSpinModule,
    NgOptimizedImage,
    FileurlPipe,
    NzModalModule,
    NzIconModule,
    NgStyle,
    NzImageModule,
  ],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ImageUploaderComponent,
    },
    {
      provide: NZ_ICONS,
      useValue: [CloseOutline],
    },
  ],
})
export class ImageUploaderComponent implements ControlValueAccessor {
  value = '';
  loading = false;
  @Input() width: number = 100;
  @Input() height: number = 100;
  @Input() cropWidth: number = 0;
  @Input() cropHeight: number = 0;
  @Input() cropper = false;
  @ViewChild('input') input!: ElementRef;
  constructor(
    private fileApi: FileApiService,
    private modalService: NzModalService,
    private imageService: NzImageService
  ) {}

  click() {
    if (this.loading) {
      return;
    }
    if (this.value) {
      const images: NzImage[] = [{ src: this.fileApi.fileurl(this.value) }];
      this.imageService.preview(images);
    } else {
      this.input.nativeElement.click();
    }
  }

  clear(e: any) {
    e.stopPropagation();
    this.value = '';
    this.onFormChange('');
  }

  onFileSelected(e: any) {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    if (this.cropper) {
      const width = this.cropWidth || this.width;
      const height = this.cropHeight || this.height;
      this.modalService
        .create({
          nzContent: CropImageModalComponent,
          nzWidth: '560px',
          nzData: {
            file: file,
            minWidth: width,
            minHeight: height,
            aspectRatio: width / height,
          },
        })
        .afterClose.subscribe((r) => {
          if (r) {
            this.upload(r);
          }
        });
    } else {
      this.upload(file);
    }
    e.target.value = '';
  }

  async upload(file: File) {
    try {
      this.loading = true;
      const r = await this.fileApi.upload(file);
      this.value = r.id;
      this.onFormChange(this.value);
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  writeValue(v: string) {
    this.value = v;
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
