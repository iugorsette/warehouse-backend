import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IItem } from './interfaces/item.interface';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Get()
  findAll(): Promise<IItem[]> {
    return this.itemService.findAll();
  }

  @Post()
  create(@Body() item: IItem) {
    return this.itemService.create(item);
  }

  @Put()
  update(@Body() item: IItem, @Query('id') id: string) {
    this.itemService.update(item, id);
    return `This action updates a ${item.title} item`;
  }

  @Delete()
  delete(@Query('id') id: string) {
    this.itemService.delete(id);
    return `This action removes a #${id} item`;
  }
}
