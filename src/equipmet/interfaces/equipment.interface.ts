import { ICollaborator } from 'src/collaborator/interfaces/collaborator.interface';

export interface IEquipment {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  collaborators?: ICollaborator[];
}
