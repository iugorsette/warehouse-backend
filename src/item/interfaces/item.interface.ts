export interface IItem {
  id: string;
  title: string;
  description: string;
  collaborator: string[];
  attributes: string;
  created_at: Date;
  updated_at: Date;
}
