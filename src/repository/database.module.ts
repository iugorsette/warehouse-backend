import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigService } from '@nestjs/config';

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
