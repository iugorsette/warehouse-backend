import { Injectable, Inject } from '@nestjs/common';
import { IDepartment } from './interfaces/department.interface';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_MODEL')
    private departmentRepository: Repository<IDepartment>,
  ) {}

  async create(department: IDepartment): Promise<IDepartment> {
    const created = this.departmentRepository.create(department);
    return this.departmentRepository.save(created);
  }

  async findAll(): Promise<IDepartment[]> {
    return this.departmentRepository.find();
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
