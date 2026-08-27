export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
