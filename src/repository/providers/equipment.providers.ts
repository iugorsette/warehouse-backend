import { Connection } from 'mongoose';
import { EquipmentSchema } from '../schemas/equipment.schema';

export const equipmentProviders = [
  {
    provide: 'EQUIPMENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Equipment', EquipmentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
