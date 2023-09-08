import { Injectable, Inject } from '@nestjs/common';
import { ICollaborator } from './interfaces/collaborator.interface';
import { Repository } from 'typeorm';

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

  async findAll(): Promise<ICollaborator[]> {
    return this.collaboratorRepository.find();
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
