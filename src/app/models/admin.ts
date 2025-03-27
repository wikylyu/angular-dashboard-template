import { BaseModel } from './base';

export enum AdminUserStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
}

export interface AdminUser extends BaseModel {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  status: AdminUserStatus;
  is_superuser: boolean;
}

export interface AdminRole extends BaseModel {
  id: number;
  name: string;
  remark: string;
  permission_ids: number[];
}
