import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/repository/database.module';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { AuthModule } from 'src/auth/auth.module';
import { departmentProviders } from './repository/department.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [DepartmentController],
  providers: [DepartmentService, ...departmentProviders],
})
export class DepartmentModule {}
