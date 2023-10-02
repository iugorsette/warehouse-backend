export interface IItem {
  id: string;
  property: string;
  value: string | number;
  equipmentId: string;
  equipment?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
