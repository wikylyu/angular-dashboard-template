import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileApiService } from 'src/app/service/api/file-api.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ImageUploaderComponent,
    },
  ],
})
export class ImageUploaderComponent implements OnInit, ControlValueAccessor {
  loading = false;

  fileid = '';
  @Input() width = '200px';
  @Input() height = '200px';
  @Input() cover = false;
  @Input() ratio = 1;

  url = '';

  constructor(private api: FileApiService, private message: NzMessageService) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.fileid) {
      this.url = this.api.fileurl(this.fileid);
    } else {
      this.url = '';
    }
    this.updateStyle();
  }

  imgStyle: any = {};
  updateStyle() {
    this.imgStyle = {
      width: this.width,
      height: this.height,
    };
    if (this.url) {
      this.imgStyle['background-image'] = `url(${this.url})`;
    } else {
      this.imgStyle['background-color'] = `#bdbdbd`;
    }
    if (this.cover) {
      this.imgStyle['background-size'] = 'cover';
    }
  }

  onChange() {
    this.fileid = this.fileid || '';
    this.onFormChange(this.fileid);
    this.updateStyle();
  }

  onFileChange(e: any) {
    const files = e.target.files;
    if (files.length === 0) {
      this.rawFile = undefined;
      return;
    }
    const file = files[0];
    this.rawFile = file;
    this.isModalVisible = true;
    // this.uploadFile(file);
  }
  rawFile: File | undefined = undefined;

  clear() {
    this.fileid = '';
    this.url = '';
    this.onChange();
  }

  async uploadFile(file: any) {
    try {
      this.loading = true;
      const r = await this.api.uploadFile(file);
      this.fileid = r.data.fileid;
      this.url = this.api.fileurl(this.fileid);
      this.onChange();
    } catch (error) {
      this.message.error('网络错误');
    } finally {
      this.loading = false;
    }
  }

  writeValue(v: any) {
    this.fileid = v;
    this.ngOnChanges();
  }

  onFormChange = (v: any) => {};

  onFormTouched = () => {};

  registerOnChange(onChange: any) {
    this.onFormChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onFormTouched = onTouched;
  }

  /* 图片裁剪相关 */
  isModalVisible = false;
  croppedBase64: string = '';
  close() {
    this.isModalVisible = false;
  }
  crop() {
    if (!this.croppedBase64) {
      return;
    }
    this.isModalVisible = false;
    const bstr = atob(this.croppedBase64.split(',')[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    const blob = new Blob([u8arr], { type: 'image/png' });

    // 将Blob对象转化为File对象
    const file = new File([blob], 'image.png', { type: 'image/png' });
    this.uploadFile(file);
  }

  imageCropped(e: ImageCroppedEvent) {
    this.croppedBase64 = e.base64 || '';
  }
}
