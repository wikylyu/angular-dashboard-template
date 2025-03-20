import { BaseModel } from './base';

export interface AdminConfig {
  onboarding: boolean;
  name: string;
  version: string;
  admin_username_pattern: string;
}

export interface AdminUser extends BaseModel {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  is_superuser: boolean;
}
