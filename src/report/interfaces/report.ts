import { IUser } from 'src/users/interfaces/users.interface';

export interface IReport {
  type: MovementTypes;
  equipment: string;
  collaborator: string;
  changeBy: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MovementTypes = 'Entrada' | 'Saída' | 'Transferência';
