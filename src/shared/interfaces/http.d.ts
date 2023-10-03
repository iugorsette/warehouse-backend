interface QueryResponse<T> {
  [key: string]: number | T[];
}

interface IQuery {
  id?: string;
  offset?: number;
  total?: number;
  limit?: number;
  property?: string;
  title?: string;
  name?: string;
  value?: string;
  role?: string;
  collaboratorId?: string;
  showStock: string;
}
