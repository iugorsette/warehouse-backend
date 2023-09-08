import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (configService: ConfigService): Promise<typeof mongoose> => {
      const mongoUri = configService.get<string>('MONGO_URI');
      return mongoose.connect(mongoUri);
    },
    inject: [ConfigService],
  },
];
