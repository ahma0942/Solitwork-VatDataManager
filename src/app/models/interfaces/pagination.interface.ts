export interface Pagination {
  numberOfElements?: number;
  skip: number;
  page?:number;
  limit: number;   // pageSize
  count?: number;
  totalPages?: number;
  pageSizeOption?: number[]
};
