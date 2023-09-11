import { Equipment } from '../entity/equipment.entity';
import { DataSource } from 'typeorm';

export const equipmentProviders = [
  {
    provide: 'EQUIPMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Equipment),
    inject: ['DATA_SOURCE'],
  },
];
