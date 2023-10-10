import { IEquipment } from 'src/equipmet/interfaces/equipment.interface';

export interface IItem {
  id: string;
  property: string;
  value: string | number;
  equipmentId: string;
  equipment?: IEquipment | string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
