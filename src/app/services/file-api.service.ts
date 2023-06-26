import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class FileApiService {
  constructor(private http: HttpService) {}

  buildurl(path: string, queryMap: any = null): string {
    return this.http.buildurl('/file' + path, queryMap);
  }

  fileurl(fileid: string): string {
    if (fileid.startsWith('http')) {
      return fileid;
    }
    if (!fileid) {
      return '';
    }
    return this.buildurl(`/${fileid}`);
  }
}
