import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ItemModule } from './item/item.module';
import { ConfigModule } from '@nestjs/config';
import { EquipmentModule } from './equipmet/equipment.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { SharedModule } from './shared/shared.module';
import { DepartmentModule } from './department/department.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CollaboratorModule,
    EquipmentModule,
    ItemModule,
    UsersModule,
    SharedModule,
    DepartmentModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
