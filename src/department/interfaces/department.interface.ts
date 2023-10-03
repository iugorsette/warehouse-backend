import { ICollaborator } from 'src/collaborator/interfaces/collaborator.interface';

export interface IDepartment {
  id: string;
  name: string;
  collaborators?: ICollaborator[];
  createdAt: Date;
  updatedAt: Date;
}
