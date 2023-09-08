import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { DatabaseModule } from 'src/repository/database.module';
import { equipmentProviders } from 'src/repository/providers/equipment.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EquipmentController],
  providers: [
    EquipmentService,
    ...equipmentProviders,
    {
      provide: 'SECRET_KEY',
      useValue: process.env.SECRET_KEY,
    },
  ],
})
export class EquipmentModule {}
