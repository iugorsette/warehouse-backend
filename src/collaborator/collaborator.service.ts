import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ICollaborator } from './interfaces/collaborator.interface';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { DepartmentService } from 'src/department/department.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';

@Injectable()
export class CollaboratorService {
  constructor(
    @Inject('COLLABORATOR_REPOSITORY')
    private collaboratorRepository: Repository<ICollaborator>,
    private departmentService: DepartmentService,
  ) {}

  async create(collaborator: CreateCollaboratorDto): Promise<ICollaborator> {
    try {
      const departmentId = collaborator.departmentId;
      // delete collaborator.department;
      const created = this.collaboratorRepository.create(collaborator);
      const { id } = await this.collaboratorRepository.save(created);

      const vinculate = {
        departmentId,
        collaboratorId: id,
      };
      if (departmentId) {
        this.departmentService.addCollaboratorToDepartment(vinculate);
      }
      return created;
    } catch (error) {
      throw new BadRequestException('Error creating collaborator');
    }
  }

  async findAll(query: IQuery): Promise<QueryResponse<ICollaborator>> {
    try {
      const findOptions: FindManyOptions<ICollaborator> = {
        take: query?.limit || 100,
        skip: query?.offset || 0,
        where: {},
        relations: ['department', 'equipments'],
        order: {
          updatedAt: 'DESC',
          createdAt: 'DESC',
        },
      };

      if (query?.department) {
        findOptions.where['department'] = Like(`%${query.department}%`);
      }
      if (query?.id) {
        findOptions.where['id'] = Like(`%${query.id}%`);
      }
      if (query?.name) {
        findOptions.where['name'] = Like(`%${query.name}%`);
      }
      if (query?.role) {
        findOptions.where['role'] = Like(`%${query.role}%`);
      }

      const [departments, total] =
        await this.collaboratorRepository.findAndCount(findOptions);

      return {
        data: departments,
        total,
        offset: Number(query?.offset) || 0,
      };
    } catch (error) {
      throw new BadRequestException('Collaborator not found');
    }
  }

  async update(
    collaborator: Partial<ICollaborator>,
    id: string,
  ): Promise<void> {
    const { department } = await this.collaboratorRepository.findOneOrFail({
      where: { id },
      relations: ['department'],
    });

    if (department?.id !== collaborator.departmentId && department?.id) {
      const desvinculate = {
        departmentId: department.id,
        collaboratorId: id,
      };

      this.departmentService.removeCollaboratorFromDepartment(desvinculate);
    }
    if (
      collaborator.departmentId &&
      department?.id !== collaborator.departmentId
    ) {
      const vinculate = {
        departmentId: collaborator.departmentId,
        collaboratorId: id,
      };
      this.departmentService.addCollaboratorToDepartment(vinculate);
    }

    delete collaborator.departmentId;

    const { affected } = await this.collaboratorRepository.update(
      { id },
      collaborator,
    );
    if (!affected) {
      throw new BadRequestException('Collaborator not found');
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    try {
      const { affected } = await this.collaboratorRepository.delete({
        id,
      });
      if (affected === 0) {
        throw new BadRequestException('Collaborator not found');
      }
      return null;
    } catch (error) {
      throw new BadRequestException('Collaborator not found');
    }
  }
}
