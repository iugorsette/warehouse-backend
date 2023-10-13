import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { IEquipment, Vinculate } from './interfaces/equipment.interface';
import { CreateEquipmentDto } from './dto/create-equipment.dto';

@UseGuards(AuthGuard)
@Controller('equipments')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}
  @Get()
  findAll(@Query() query: IQuery): Promise<QueryResponse<IEquipment>> {
    if (Number(query?.offset) > 0) {
      query.offset = Number(query.offset) * Number(query.limit);
    }
    return this.equipmentService.findAll(query);
  }

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Put()
  update(@Body() equipmentDto: CreateEquipmentDto, @Query('id') id: string) {
    return this.equipmentService.update(equipmentDto, id);
  }

  @Post('vinculateCollaborator')
  vinculateCollaborator(@Body() vinculate: Vinculate) {
    return this.equipmentService.addCollaboratorToEquipment(vinculate);
  }

  @Post('removeCollaborator')
  desvinculateCollaborator(@Body() vinculate: Vinculate) {
    return this.equipmentService.removeCollaboratorFromEquipment(vinculate);
  }

  @Delete()
  delete(@Query('id') id: string) {
    return this.equipmentService.delete(id);
  }
}
