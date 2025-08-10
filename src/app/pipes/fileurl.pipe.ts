import { Pipe, PipeTransform } from '@angular/core';
import { FileApiService } from '../services/apis/file-api.service';

@Pipe({
  name: 'fileurl',
})
export class FileurlPipe implements PipeTransform {
  constructor(private fileApi: FileApiService) {}

  transform(value: string | undefined, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    return this.fileApi.fileurl(value);
  }
}
