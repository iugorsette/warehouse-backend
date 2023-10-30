import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaintainceService } from './maintaince.service';
import { CreateMaintainceDto } from './dto/create-maintaince.dto';
import { UpdateMaintainceDto } from './dto/update-maintaince.dto';

@Controller('maintaince')
export class MaintainceController {
  constructor(private readonly maintainceService: MaintainceService) {}

  @Post()
  create(@Body() createMaintainceDto: CreateMaintainceDto) {
    return this.maintainceService.create(createMaintainceDto);
  }

  @Get()
  findAll() {
    return this.maintainceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintainceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaintainceDto: UpdateMaintainceDto,
  ) {
    return this.maintainceService.update(+id, updateMaintainceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintainceService.remove(+id);
  }
}
