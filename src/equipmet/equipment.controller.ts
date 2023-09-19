import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { IEquipment } from './interfaces/equipment.interface';

@UseGuards(AuthGuard)
@Controller('equipments')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}
  @Get()
  findAll(@Query() query: IQuery): Promise<QueryResponse<IEquipment>> {
    return this.equipmentService.findAll(query);
  }

  @Post()
  create(@Body() equipment: IEquipment) {
    return this.equipmentService.create(equipment);
  }

  @Put()
  update(@Body() equipment: IEquipment, @Query('id') id: string) {
    this.equipmentService.update(equipment, id);
    return `This action updates a ${equipment.title} equipment`;
  }

  @Post('vinculateCollaborator')
  vinculateCollaborator(
    @Query('equipmentId') equipmentId: string,
    @Query('collaboratorId') collaboratorId: string,
  ) {
    return this.equipmentService.addCollaboratorToEquipment(
      equipmentId,
      collaboratorId,
    );
  }

  @Post('removeCollaborator')
  desvinculateCollaborator(
    @Query('equipmentId') equipmentId: string,
    @Query('collaboratorId') collaboratorId: string,
  ) {
    return this.equipmentService.removeCollaboratorFromEquipment(
      equipmentId,
      collaboratorId,
    );
  }

  // @Delete()
  // delete(@Query('id') id: string) {
  //   this.equipmentService.delete(id);
  //   return `This action removes a #${id} equipment`;
  // }
}
