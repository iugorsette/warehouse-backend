import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IItem } from './interfaces/item.interface';
import { FindManyOptions, IsNull, Like, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY') private itemRepository: Repository<IItem>,
  ) {}

  async create(item: CreateItemDto): Promise<IItem> {
    try {
      const created = this.itemRepository.create(item);
      return this.itemRepository.save(created);
    } catch (error) {
      throw new NotFoundException('Error creating item');
    }
  }

  async findOne(id: string): Promise<IItem> {
    try {
      return this.itemRepository.findOneOrFail({
        where: { id },
        relations: ['equipment'],
      });
    } catch (error) {
      throw new NotFoundException('Item not found');
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

      if (query?.showStock === 'true') {
        findOptions.relationLoadStrategy = 'join';

        findOptions.where = {
          equipment: {
            id: IsNull(),
          },
        };
      }

      if (query?.property) {
        findOptions.where['property'] = Like(`%${query.property}%`);
      }

      if (query?.id) {
        findOptions.where['id'] = Like(`%${query.id}%`);
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
