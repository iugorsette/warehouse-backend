import { Collaborator } from '../entity/collaborator.entity';
import { DataSource } from 'typeorm';

export const collaboratorProviders = [
  {
    provide: 'COLLABORATOR_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Collaborator),
    inject: ['DATA_SOURCE'],
  },
];
