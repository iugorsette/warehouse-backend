export interface IItem {
  id: string;
  property: string;
  value: string | number;
  equipmentId: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
