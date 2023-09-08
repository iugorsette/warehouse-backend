import { Injectable, Inject } from '@nestjs/common';
import { IItem } from './interfaces/item.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY') private itemRepository: Repository<IItem>,
  ) {}

  async create(item: IItem): Promise<IItem> {
    const created = this.itemRepository.create(item);
    return this.itemRepository.save(created);
  }

  async findAll(): Promise<IItem[]> {
    return this.itemRepository.find();
  }

  async update(item: IItem, id: string): Promise<void> {
    const { affected } = await this.itemRepository.update({ id }, item);
    if (!affected) {
      throw new Error('Item not found');
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const { affected } = await this.itemRepository.delete({ id });
    if (!affected) {
      throw new Error('Item not found');
    }
    return null;
  }
}
