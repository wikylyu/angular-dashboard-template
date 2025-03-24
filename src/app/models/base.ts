export interface BaseModel {
  created_at: string;
  updated_at: string;
  created_by: number | undefined;
}

export interface Pagination<T> {
  page: number;
  page_size: number;
  total: number;
  items: T[];
}
