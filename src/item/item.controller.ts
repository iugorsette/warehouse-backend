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
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Get()
  findAll(@Query() query: IQuery): Promise<QueryResponse<IItem>> {
    return this.itemService.findAll(query);
  }

  @Post()
  create(@Body() item: IItem) {
    return this.itemService.create(item);
  }

  @Put()
  update(@Body() item: IItem, @Query('id') id: string) {
    this.itemService.update(item, id);
    return `This action updates a ${item.property} item`;
  }

  @Delete()
  delete(@Query('id') id: string) {
    this.itemService.delete(id);
    return `This action removes a #${id} item`;
  }
}
