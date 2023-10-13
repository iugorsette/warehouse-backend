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
import { CreateItemDto } from './dto/create-item.dto';

@UseGuards(AuthGuard)
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Get()
  findAll(@Query() query: IQuery): Promise<QueryResponse<IItem>> {
    if (Number(query?.offset) > 0) {
      query.offset = Number(query.offset) * Number(query.limit);
    }
    return this.itemService.findAll(query);
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Put()
  update(@Body() item: IItem, @Query('id') id: string) {
    return this.itemService.update(item, id);
  }

  @Delete()
  delete(@Query('id') id: string) {
    return this.itemService.delete(id);
  }
}
