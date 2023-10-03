import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICollaborator } from './interfaces/collaborator.interface';
import { FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class CollaboratorService {
  constructor(
    @Inject('COLLABORATOR_REPOSITORY')
    private collaboratorRepository: Repository<ICollaborator>,
  ) {}

  async create(collaborator: ICollaborator): Promise<ICollaborator> {
    try {
      const created = this.collaboratorRepository.create(collaborator);
      return this.collaboratorRepository.save(created);
    } catch (error) {
      throw new NotFoundException('Error creating collaborator');
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
      throw new NotFoundException('Collaborator not found');
    }
  }

  async update(collaborator: ICollaborator, id: string): Promise<void> {
    try {
      const { affected } = await this.collaboratorRepository.update(
        { id },
        collaborator,
      );
      if (!affected) {
        throw new NotFoundException('Collaborator not found');
      }
      return null;
    } catch (error) {
      throw new NotFoundException('Collaborator not found');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const { affected } = await this.collaboratorRepository.delete({
        id,
      });
      if (affected === 0) {
        throw new NotFoundException('Collaborator not found');
      }
      return null;
    } catch (error) {
      throw new NotFoundException('Collaborator not found');
    }
  }
}
