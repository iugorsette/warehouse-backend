import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/repository/database.module';
import { collaboratorProviders } from 'src/repository/providers/collaborator.providers';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorService } from './collaborator.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CollaboratorController],
  providers: [CollaboratorService, ...collaboratorProviders],
})
export class CollaboratorModule {}
