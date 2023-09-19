import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/repository/database.module';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { departmentProviders } from 'src/repository/providers/department.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [DepartmentController],
  providers: [DepartmentService, ...departmentProviders],
})
export class DepartmentModule {}
