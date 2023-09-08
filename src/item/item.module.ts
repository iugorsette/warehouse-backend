import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { DatabaseModule } from 'src/repository/database.module';
import { itemsProviders } from 'src/repository/providers/items.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemController],
  providers: [
    ItemService,
    ...itemsProviders,
    {
      provide: 'SECRET_KEY',
      useValue: process.env.SECRET_KEY,
    },
  ],
})
export class ItemModule {}
