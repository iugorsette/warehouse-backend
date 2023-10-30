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
import { DepartmentService } from 'src/department/department.service';
import { departmentProviders } from 'src/department/repository/department.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [EquipmentController],
  providers: [
    EquipmentService,
    ReportService,
    ItemService,
    DepartmentService,
    ...departmentProviders,
    ...equipmentProviders,
    ...collaboratorProviders,
    ...reportProviders,
    ...itemsProviders,
  ],
})
export class EquipmentModule {}
