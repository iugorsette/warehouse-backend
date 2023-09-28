export interface IItem {
  id: string;
  property: string;
  value: string | number;
  equipmentId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
