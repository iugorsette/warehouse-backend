import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IEquipment } from './interfaces/equipment.interface';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject('EQUIPMENT_MODEL') private equipmentModel: Model<IEquipment>,
  ) {}

  async create(equipment: IEquipment): Promise<IEquipment> {
    const created = new this.equipmentModel(equipment);
    return created.save();
  }

  async findAll(): Promise<IEquipment[]> {
    return this.equipmentModel.find().exec();
  }

  async update(equipment: IEquipment, id: string): Promise<void> {
    const { acknowledged } = await this.equipmentModel
      .updateOne({ _id: id }, equipment)
      .exec();
    if (!acknowledged) {
      throw new Error('Equipment not found');
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const { deletedCount } = await this.equipmentModel
      .deleteOne({ _id: id })
      .exec();
    if (!deletedCount) {
      throw new Error('Equipment not found');
    }
    return null;
  }
}
