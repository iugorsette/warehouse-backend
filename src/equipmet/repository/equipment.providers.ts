import { DataSource } from 'typeorm';
import { Equipment } from './equipment.entity';

export const equipmentProviders = [
  {
    provide: 'EQUIPMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Equipment),
    inject: ['DATA_SOURCE'],
  },
];
