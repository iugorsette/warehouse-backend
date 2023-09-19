import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { DatabaseModule } from 'src/repository/database.module';
import { equipmentProviders } from 'src/repository/providers/equipment.providers';
import { collaboratorProviders } from 'src/repository/providers/collaborator.providers';
import { reportProviders } from 'src/repository/providers/report.providers';
import { ReportController } from './report.controller';
import { AuthModule } from 'src/auth/auth.module';

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
