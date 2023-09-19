import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { DatabaseModule } from 'src/repository/database.module';
import { itemsProviders } from 'src/repository/providers/items.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ItemController],
  providers: [ItemService, ...itemsProviders],
})
export class ItemModule {}
