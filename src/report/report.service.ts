import { Inject, Injectable } from '@nestjs/common';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { IReport } from './interfaces/report';

@Injectable()
export class ReportService {
  constructor(
    @Inject('REPORT_REPOSITORY')
    private reportRepository: Repository<IReport>,
  ) {}

  async create(report: IReport): Promise<IReport> {
    try {
      const created = this.reportRepository.create(report);
      return this.reportRepository.save(created);
    } catch (error) {
      throw new Error('Error creating report');
    }
  }

  async findAll(query: any): Promise<QueryResponse<IReport>> {
    try {
      const findOptions: FindManyOptions<IReport> = {
        take: query?.limit || 100,
        skip: query?.offset || 0,
        where: {},
        relations: ['equipment', 'collaborator', 'changeBy'],
      };

      if (query?.type) {
        findOptions.where['title'] = Like(`%${query.type}%`);
      }

      const [reports, total] =
        await this.reportRepository.findAndCount(findOptions);

      return {
        data: reports,
        total,
        offset: Number(query?.offset) || 0,
      };
    } catch (error) {
      throw new Error('Report not found');
    }
  }
}
