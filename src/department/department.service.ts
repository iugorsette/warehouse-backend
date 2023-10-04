import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IDepartment } from './interfaces/department.interface';
import { FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private departmentRepository: Repository<IDepartment>,
  ) {}

  async create(department: IDepartment): Promise<IDepartment> {
    try {
      const created = this.departmentRepository.create(department);
      return this.departmentRepository.save(created);
    } catch (error) {
      throw new BadRequestException('Error creating department');
    }
  }

  async findAll(query: IQuery): Promise<QueryResponse<IDepartment>> {
    try {
      const findOptions: FindManyOptions<IDepartment> = {
        take: query?.limit || 100,
        skip: query?.offset || 0,
        where: {},
        relations: ['collaborators'],
        order: {
          updatedAt: 'DESC',
          createdAt: 'DESC',
        },
      };

      if (query?.name) {
        findOptions.where['name'] = Like(`%${query.name}%`);
      }

      if (query?.id) {
        findOptions.where['id'] = Like(`%${query.id}%`);
      }

      const [departments, total] =
        await this.departmentRepository.findAndCount(findOptions);

      return {
        data: departments,
        total,
        offset: Number(query?.offset) || 0,
      };
    } catch (error) {
      throw new BadRequestException('department not found');
    }
  }

  async update(department: IDepartment, id: string): Promise<void> {
    try {
      const { affected } = await this.departmentRepository.update(
        { id },
        department,
      );
      if (!affected) {
        throw new BadRequestException('department not found');
      }
      return null;
    } catch (error) {
      throw new BadRequestException('department not found');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const { affected } = await this.departmentRepository.delete({ id });
      if (!affected) {
        throw new BadRequestException('department not found');
      }
      return null;
    } catch (error) {
      throw new BadRequestException('department not found');
    }
  }

  async addCollaboratorToDepartment({
    departmentId,
    collaboratorId,
  }): Promise<IDepartment> {
    try {
      const department = await this.departmentRepository.findOne({
        where: { id: departmentId },
        relations: ['collaborators'],
      });
      department.collaborators.push({ id: collaboratorId } as any);
      return this.departmentRepository.save(department);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removeCollaboratorFromDepartment({
    departmentId,
    collaboratorId,
  }): Promise<IDepartment> {
    try {
      const department = await this.departmentRepository.findOne({
        where: { id: departmentId },
        relations: ['collaborators'],
      });
      if (!department) {
        throw new BadRequestException('department not found');
      }
      department.collaborators = department.collaborators.filter(
        (collaborator) => collaborator.id !== collaboratorId,
      );
      return this.departmentRepository.save(department);
    } catch (error) {
      throw new BadRequestException('department not found');
    }
  }
}
