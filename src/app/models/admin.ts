import { BaseModel } from './base';

export enum AdminUserStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
}

export interface AdminConfig {
  onboarding: boolean;
  appname: string;
  copyright: string;
  version: string;
  admin_username_pattern: string;
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
