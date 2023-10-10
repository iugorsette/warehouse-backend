import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { DatabaseModule } from 'src/repository/database.module';
import { ReportController } from './report.controller';
import { AuthModule } from 'src/auth/auth.module';
import { reportProviders } from './repository/report.providers';
import { collaboratorProviders } from 'src/collaborator/repository/collaborator.providers';
import { equipmentProviders } from 'src/equipmet/repository/equipment.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ReportController],
  providers: [
    ReportService,
    ...reportProviders,
    ...collaboratorProviders,
    ...equipmentProviders,
  ],
  exports: [ReportService],
})
export class ReportModule {}
