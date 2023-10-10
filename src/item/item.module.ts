import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { DatabaseModule } from 'src/repository/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { itemsProviders } from './repository/items.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ItemController],
  providers: [ItemService, ...itemsProviders],
})
export class ItemModule {}
