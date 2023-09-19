import { DataSource } from 'typeorm';
import { Report } from '../entity/report.entity';

export const reportProviders = [
  {
    provide: 'REPORT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Report),
    inject: ['DATA_SOURCE'],
  },
];
