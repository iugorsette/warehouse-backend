interface QueryResponse<T> {
  [key: string]: number | T[];
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
