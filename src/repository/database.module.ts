import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { databaseProviders } from './providers/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig() {
    return this.configService.get<string>('MONGO_URI');
  }
}
