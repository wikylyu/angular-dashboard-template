import { BaseModel } from './base';

export interface Permission extends BaseModel {
  id: number;
  name: string;
  code: string;
  parent_id: number;
  remark: string;
  sort: number;
  children: Permission[];
}

export interface Route {
  method: string;
  path: string;
}

export interface Api extends BaseModel {
  id: number;
  method: string;
  path: string;
  permission_ids: number[];
}
