import { ICollaborator } from 'src/collaborator/interfaces/collaborator.interface';
import { IItem } from 'src/item/interfaces/item.interface';

export interface IEquipment {
  id: string;
  register: string;
  title: string;
  description: string;
  items?: IItem[];
  createdAt: Date;
  updatedAt: Date;
  collaborators?: ICollaborator[];
}

export interface Vinculate {
  equipmentId: string;
  collaboratorId: string;
}
