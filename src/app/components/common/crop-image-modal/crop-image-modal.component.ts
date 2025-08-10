import { Component, Inject, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { ImageCropperComponent } from 'ngx-image-cropper';

export interface CropImageData {
  file: File;
  minWidth?: number;
  minHeight?: number;
  aspectRatio?: number;
}

@Component({
    selector: 'app-crop-image-modal',
    imports: [NzModalModule, ImageCropperComponent, NzButtonModule],
    templateUrl: './crop-image-modal.component.html',
    styleUrl: './crop-image-modal.component.scss'
})
export class CropImageModalComponent {
  constructor(
    private modalRef: NzModalRef<CropImageModalComponent>,
    @Inject(NZ_MODAL_DATA) public data: CropImageData
  ) {}

  @ViewChild('cropper') cropper!: ImageCropperComponent;

  close(r: any = null) {
    this.modalRef.close(r);
  }

  async onOk() {
    if (!this.cropper) {
      return;
    }
    const e = await this.cropper.crop('blob');
    this.close(e?.blob);
  }
}
