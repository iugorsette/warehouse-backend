import { Injectable, Inject } from '@nestjs/common';
import { ICollaborator } from './interfaces/collaborator.interface';
import { FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class CollaboratorService {
  constructor(
    @Inject('COLLABORATOR_REPOSITORY')
    private collaboratorRepository: Repository<ICollaborator>,
  ) {}

  async create(collaborator: ICollaborator): Promise<ICollaborator> {
    const created = this.collaboratorRepository.create(collaborator);
    return this.collaboratorRepository.save(created);
  }

  async findAll(query: IQuery): Promise<QueryResponse<ICollaborator>> {
    const findOptions: FindManyOptions<ICollaborator> = {
      take: query?.limit || 100,
      skip: query?.offset || 0,
      where: {},
      relations: ['department'],
    };

    if (query?.title) {
      findOptions.where['title'] = Like(`%${query.title}%`);
    }

    const [departments, total] =
      await this.collaboratorRepository.findAndCount(findOptions);

    return {
      data: departments,
      total,
      offset: Number(query?.offset) || 0,
    };
  }

  async update(collaborator: ICollaborator, id: string): Promise<void> {
    const { affected } = await this.collaboratorRepository.update(
      { id },
      collaborator,
    );
    if (!affected) {
      throw new Error('Collaborator not found');
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const { affected } = await this.collaboratorRepository.delete({ id });
    if (!affected) {
      throw new Error('Collaborator not found');
    }
    return null;
  }
}
