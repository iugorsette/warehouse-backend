import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IItem } from './interfaces/item.interface';

@Injectable()
export class ItemService {
  constructor(@Inject('ITEM_MODEL') private itemModel: Model<IItem>) {}

  async create(item: IItem): Promise<IItem> {
    const createdCat = new this.itemModel(item);
    return createdCat.save();
  }

  async findAll(): Promise<IItem[]> {
    return this.itemModel.find().exec();
  }

  async update(item: IItem, id: string): Promise<void> {
    const { acknowledged } = await this.itemModel
      .updateOne({ _id: id }, item)
      .exec();
    if (!acknowledged) {
      throw new Error('Item not found');
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const { deletedCount } = await this.itemModel.deleteOne({ _id: id }).exec();
    if (!deletedCount) {
      throw new Error('Item not found');
    }
    return null;
  }
}
