import { BaseModel } from './base';

export interface UploadedFile extends BaseModel {
  id: string;
  filename: string;
  content_type: string;
  size: number;
}
