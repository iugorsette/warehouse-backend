import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { DatabaseModule } from 'src/repository/database.module';
import { equipmentProviders } from 'src/repository/providers/equipment.providers';
import { collaboratorProviders } from 'src/repository/providers/collaborator.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EquipmentController],
  providers: [
    EquipmentService,
    ...equipmentProviders,
    ...collaboratorProviders,
  ],
})
export class EquipmentModule {}
