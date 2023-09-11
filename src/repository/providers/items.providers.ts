import { Item } from '../entity/item.entity';
import { DataSource } from 'typeorm';

export const itemsProviders = [
  {
    provide: 'ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Item),
    inject: ['DATA_SOURCE'],
  },
];
