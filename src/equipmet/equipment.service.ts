import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { IEquipment } from './interfaces/equipment.interface';
import { ICollaborator } from 'src/collaborator/interfaces/collaborator.interface';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject('EQUIPMENT_REPOSITORY')
    private equipmentRepository: Repository<IEquipment>,
    @Inject('COLLABORATOR_REPOSITORY')
    private collaboratorRepository: Repository<ICollaborator>,
  ) {}

  async create(equipment: IEquipment): Promise<IEquipment> {
    const created = this.equipmentRepository.create(equipment);
    return this.equipmentRepository.save(created);
  }

  async findAll(query?: IQuery): Promise<QueryResponse<IEquipment>> {
    const findOptions: FindManyOptions<IEquipment> = {
      take: query?.limit || 100,
      skip: query?.offset || 0,
      where: {},
      relations: ['items', 'collaborators'],
    };

    if (query?.title) {
      findOptions.where['title'] = Like(`%${query.title}%`);
    }

    const [equipments, total] =
      await this.equipmentRepository.findAndCount(findOptions);

    return {
      data: equipments,
      total,
      offset: Number(query?.offset) || 0,
    };
  }

  async update(equipment: IEquipment, id: string): Promise<void> {
    const { affected } = await this.equipmentRepository.update(
      { id },
      equipment,
    );
    if (!affected) {
      throw new NotFoundException('Equipment not found');
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const { affected } = await this.equipmentRepository.delete({ id });
    if (!affected) {
      throw new Error('Equipment not found');
    }
    return null;
  }

  async addCollaboratorToEquipment(
    equipmentId: string,
    collaboratorId: string,
  ): Promise<void> {
    console.log(equipmentId);
    const equipment = await this.equipmentRepository.findOneOrFail({
      where: { id: equipmentId },
    });
    const collaborator = await this.collaboratorRepository.findOneOrFail({
      where: { id: collaboratorId },
    });
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }
    if (!collaborator) {
      throw new NotFoundException('Collaborator not found');
    }
    if (!equipment.collaborators) {
      equipment.collaborators = [];
    }
    equipment.collaborators.push(collaborator);
    await this.equipmentRepository.save(equipment);
  }

  async removeCollaboratorFromEquipment(
    equipmentId: string,
    collaboratorId: string,
  ): Promise<void> {
    const equipment = await this.equipmentRepository.findOneOrFail({
      where: { id: equipmentId },
    });
    const collaborator = await this.collaboratorRepository.findOneOrFail({
      where: { id: collaboratorId },
    });
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }
    if (!collaborator) {
      throw new NotFoundException('Collaborator not found');
    }
    if (!equipment.collaborators) {
      equipment.collaborators = [];
    }
    equipment.collaborators = equipment.collaborators.filter(
      (c) => c.id !== collaborator.id,
    );
    await this.equipmentRepository.save(equipment);
  }
}
