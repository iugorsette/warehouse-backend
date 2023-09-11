import { Injectable, Inject } from '@nestjs/common';
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

  async findAll(query?: {
    offset?: number;
    limit?: number;
    title?: string;
  }): Promise<IEquipment[] | any> {
    const findOptions: FindManyOptions<IEquipment> = {
      take: query?.limit || 100,
      skip: query?.offset || 0,
      where: {},
    };

    if (query?.title) {
      findOptions.where['title'] = Like(`%${query.title}%`);
    }

    const equipments = await this.equipmentRepository.findAndCount(findOptions);

    return {
      equipments: equipments[0],
      total: equipments[1],
      offset: Number(query?.offset) || 0,
    };
  }

  async update(equipment: IEquipment, id: string): Promise<void> {
    const { affected } = await this.equipmentRepository.update(
      { id },
      equipment,
    );
    if (!affected) {
      throw new Error('Equipment not found');
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
