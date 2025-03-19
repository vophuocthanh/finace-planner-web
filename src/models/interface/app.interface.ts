export interface ListResponse<T> {
  data: T[]
  total: number
  page: number
  items_per_page: number
}
