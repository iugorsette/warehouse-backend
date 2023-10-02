import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { DatabaseModule } from 'src/repository/database.module';
import { equipmentProviders } from 'src/repository/providers/equipment.providers';
import { collaboratorProviders } from 'src/repository/providers/collaborator.providers';
import { ReportService } from 'src/report/report.service';
import { reportProviders } from 'src/repository/providers/report.providers';
import { AuthModule } from 'src/auth/auth.module';
import { itemsProviders } from 'src/repository/providers/items.providers';
import { ItemService } from 'src/item/item.service';

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
