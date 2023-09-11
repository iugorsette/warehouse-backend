import { Injectable, Inject } from '@nestjs/common';
import { IDepartment } from './interfaces/department.interface';
import { FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private departmentRepository: Repository<IDepartment>,
  ) {}

  async create(department: IDepartment): Promise<IDepartment> {
    const created = this.departmentRepository.create(department);
    return this.departmentRepository.save(created);
  }

  async findAll(query: IQuery): Promise<QueryResponse<IDepartment>> {
    const findOptions: FindManyOptions<IDepartment> = {
      take: query?.limit || 100,
      skip: query?.offset || 0,
      where: {},
      relations: ['collaborators'],
    };

    if (query?.name) {
      findOptions.where['name'] = Like(`%${query.name}%`);
    }

    const [departments, total] =
      await this.departmentRepository.findAndCount(findOptions);

    return {
      data: departments,
      total,
      offset: Number(query?.offset) || 0,
    };
  }

  async update(department: IDepartment, id: string): Promise<void> {
    const { affected } = await this.departmentRepository.update(
      { id },
      department,
    );
    if (!affected) {
      throw new Error('department not found');
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const { affected } = await this.departmentRepository.delete({ id });
    if (!affected) {
      throw new Error('department not found');
    }
    return null;
  }
}
