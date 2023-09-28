import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IItem } from './interfaces/item.interface';
import { FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY') private itemRepository: Repository<IItem>,
  ) {}

  async create(item: IItem): Promise<IItem> {
    try {
      const created = this.itemRepository.create(item);
      return this.itemRepository.save(created);
    } catch (error) {
      throw new NotFoundException('Error creating item');
    }
  }

  async findAll(query: IQuery): Promise<QueryResponse<IItem>> {
    try {
      const findOptions: FindManyOptions<IItem> = {
        take: query?.limit || 100,
        skip: query?.offset || 0,
        where: {},
        relations: ['equipment'],
        order: {
          updatedAt: 'DESC',
          createdAt: 'DESC',
        },
      };

      if (query?.property) {
        findOptions.where['property'] = Like(`%${query.property}%`);
      }

      if (query?.value) {
        findOptions.where['value'] = Like(`%${query.value}%`);
      }

      const [items, total] =
        await this.itemRepository.findAndCount(findOptions);

      return {
        data: items,
        total,
        offset: Number(query?.offset) || 0,
      };
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }

  async update(item: IItem, id: string): Promise<void> {
    try {
      const { affected } = await this.itemRepository.update({ id }, item);
      if (!affected) {
        throw new NotFoundException('Item not found');
      }
      return null;
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const { affected } = await this.itemRepository.delete({ id });
      if (!affected) {
        throw new NotFoundException('Item not found');
      }
      return null;
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }
}
