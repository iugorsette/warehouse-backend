import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ICollaborator } from './interfaces/collaborator.interface';

@Injectable()
export class CollaboratorService {
  constructor(
    @Inject('COLLABORATOR_MODEL')
    private collaboratorModel: Model<ICollaborator>,
  ) {}

  async create(collaborator: ICollaborator): Promise<ICollaborator> {
    const created = new this.collaboratorModel(collaborator);
    return created.save();
  }

  async findAll(): Promise<ICollaborator[]> {
    return this.collaboratorModel.find().exec();
  }

  async update(collaborator: ICollaborator, id: string): Promise<void> {
    const { acknowledged } = await this.collaboratorModel
      .updateOne({ _id: id }, collaborator)
      .exec();
    if (!acknowledged) {
      throw new Error('Collaborator not found');
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const { deletedCount } = await this.collaboratorModel
      .deleteOne({ _id: id })
      .exec();
    if (!deletedCount) {
      throw new Error('Collaborator not found');
    }
    return null;
  }
}
