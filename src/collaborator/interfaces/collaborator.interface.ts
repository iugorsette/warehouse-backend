import { IDepartment } from 'src/department/interfaces/department.interface';
import { IEquipment } from 'src/equipmet/interfaces/equipment.interface';

export interface ICollaborator {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  equipments?: IEquipment[];
  department?: IDepartment;
}
