import { DataSource } from 'typeorm';
import { Maintaince } from './maintaince.entity';

export const maintainceProviders = [
  {
    provide: 'MAINTAINCE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Maintaince),
    inject: ['DATA_SOURCE'],
  },
];
