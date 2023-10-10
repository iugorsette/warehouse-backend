import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/repository/database.module';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorService } from './collaborator.service';
import { AuthModule } from 'src/auth/auth.module';
import { DepartmentService } from 'src/department/department.service';
import { collaboratorProviders } from './repository/collaborator.providers';
import { departmentProviders } from 'src/department/repository/department.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CollaboratorController],
  providers: [
    CollaboratorService,
    DepartmentService,
    ...collaboratorProviders,
    ...departmentProviders,
  ],
})
export class CollaboratorModule {}
