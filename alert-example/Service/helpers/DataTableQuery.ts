export interface IQuery {
  page: number;
  pageSize: number;
  search?: string;
  orderBy?: string;
  specialQuery: string;
}

const GetDataTableQuery = (query: IQuery): string => {
  let queryString = "";
  queryString = "?pageSize=" + query.pageSize + "&page=" + query.page;
  if (query?.search) queryString = queryString + "&search=" + query.search;
  if (query?.orderBy) queryString = queryString + "&orderBy=" + query.orderBy;

  return queryString + query.specialQuery;
};

export default GetDataTableQuery;
