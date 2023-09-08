import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IDepartment } from './interfaces/department.interface';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_MODEL')
    private departmentModel: Model<IDepartment>,
  ) {}

  async create(department: IDepartment): Promise<IDepartment> {
    const created = new this.departmentModel(department);
    return created.save();
  }

  async findAll(): Promise<IDepartment[]> {
    return this.departmentModel.find().exec();
  }

  async update(department: IDepartment, id: string): Promise<void> {
    const { acknowledged } = await this.departmentModel
      .updateOne({ _id: id }, department)
      .exec();
    if (!acknowledged) {
      throw new Error('department not found');
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const { deletedCount } = await this.departmentModel
      .deleteOne({ _id: id })
      .exec();
    if (!deletedCount) {
      throw new Error('department not found');
    }
    return null;
  }
}
