import { ICollaborator } from 'src/collaborator/interfaces/collaborator.interface';

export interface IEquipment {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  collaborators?: ICollaborator[];
}
