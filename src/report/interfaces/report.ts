import { ICollaborator } from 'src/collaborator/interfaces/collaborator.interface';
import { IEquipment } from 'src/equipmet/interfaces/equipment.interface';
import { IUser } from 'src/users/interfaces/users.interface';

export interface IReport {
  type: MovementTypes;
  equipment: IEquipment | string;
  collaborator: ICollaborator | string;
  changeBy: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MovementTypes = 'Entrada' | 'Saída' | 'Transferência';
