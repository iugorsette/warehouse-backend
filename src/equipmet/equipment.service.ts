import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { IEquipment } from './interfaces/equipment.interface';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject('EQUIPMENT_REPOSITORY')
    private equipmentRepository: Repository<IEquipment>,
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
}