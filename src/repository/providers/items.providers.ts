import { Connection } from 'mongoose';
import { ItemSchema } from '../schemas/item.schema';

export const itemsProviders = [
  {
    provide: 'ITEM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Item', ItemSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
