import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { DatabaseModule } from 'src/repository/database.module';
import { ReportService } from 'src/report/report.service';
import { AuthModule } from 'src/auth/auth.module';
import { ItemService } from 'src/item/item.service';
import { equipmentProviders } from './repository/equipment.providers';
import { collaboratorProviders } from 'src/collaborator/repository/collaborator.providers';
import { reportProviders } from 'src/report/repository/report.providers';
import { itemsProviders } from 'src/item/repository/items.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [EquipmentController],
  providers: [
    EquipmentService,
    ReportService,
    ItemService,
    ...equipmentProviders,
    ...collaboratorProviders,
    ...reportProviders,
    ...itemsProviders,
  ],
})
export class EquipmentModule {}
