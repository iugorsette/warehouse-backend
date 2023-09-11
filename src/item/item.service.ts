import { Injectable, Inject } from '@nestjs/common';
import { IItem } from './interfaces/item.interface';
import { FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY') private itemRepository: Repository<IItem>,
  ) {}

  async create(item: IItem): Promise<IItem> {
    const created = this.itemRepository.create(item);
    return this.itemRepository.save(created);
  }

  async findAll(query: IQuery): Promise<QueryResponse<IItem>> {
    const findOptions: FindManyOptions<IItem> = {
      take: query?.limit || 100,
      skip: query?.offset || 0,
      where: {},
      relations: ['equipment'],
    };

    if (query?.property) {
      findOptions.where['property'] = Like(`%${query.property}%`);
    }

    if (query?.value) {
      findOptions.where['value'] = Like(`%${query.value}%`);
    }

    const [items, total] = await this.itemRepository.findAndCount(findOptions);

    return {
      data: items,
      total,
      offset: Number(query?.offset) || 0,
    };
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
