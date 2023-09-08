import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/repository/database.module';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { departmentProviders } from 'src/repository/providers/department.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DepartmentController],
  providers: [DepartmentService, ...departmentProviders],
})
export class DepartmentModule {}
