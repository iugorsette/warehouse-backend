import { Connection } from 'mongoose';
import { CollaboratorSchema } from '../schemas/collaborator.schema';

export const collaboratorProviders = [
  {
    provide: 'COLLABORATOR_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Collaborator', CollaboratorSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
