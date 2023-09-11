interface QueryResponse<T> {
  data: T[];
  offset?: number;
  total?: number;
}

interface IQuery {
  offset?: number;
  total?: number;
  limit?: number;
  property?: string;
  title?: string;
  name?: string;
  value?: string;
}
