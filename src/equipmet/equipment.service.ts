import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<IEquipment[]> {
    return this.equipmentRepository.find();
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
