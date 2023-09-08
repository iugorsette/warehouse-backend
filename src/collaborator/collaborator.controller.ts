import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { ICollaborator } from './interfaces/collaborator.interface';
import { CollaboratorService } from './collaborator.service';

@UseGuards(AuthGuard)
@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}
  @Get()
  findAll(): Promise<ICollaborator[]> {
    return this.collaboratorService.findAll();
  }

  @Post()
  create(@Body() collaborator: ICollaborator) {
    return this.collaboratorService.create(collaborator);
  }

  @Put()
  update(@Body() collaborator: ICollaborator, @Query('id') id: string) {
    this.collaboratorService.update(collaborator, id);
    return `This action updates a ${collaborator.name} collaborator`;
  }

  @Delete()
  delete(@Query('id') id: string) {
    this.collaboratorService.delete(id);
    return `This action removes a #${id} collaborator`;
  }
}
