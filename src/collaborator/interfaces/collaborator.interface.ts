import { IDepartment } from 'src/department/interfaces/department.interface';
import { IEquipment } from 'src/equipmet/interfaces/equipment.interface';

export interface ICollaborator {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  equipments?: IEquipment[];
  department?: IDepartment;
  departmentId?: string;
}
