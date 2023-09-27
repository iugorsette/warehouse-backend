import { Controller, Get, Query } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { IReport } from './interfaces/report';

@UseGuards(AuthGuard)
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  findAll(@Query() query: IQuery): Promise<QueryResponse<IReport>> {
    if (Number(query?.offset) > 0) {
      query.offset = Number(query.offset) * Number(query.limit);
    }
    return this.reportService.findAll(query);
  }
}
