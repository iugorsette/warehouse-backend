import {
  Body,
  Controller,
  Delete,
  Get,
  BadRequestException,
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
  async findAll(@Query() query: IQuery): Promise<QueryResponse<ICollaborator>> {
    if (Number(query?.offset) > 0) {
      query.offset = Number(query.offset) * Number(query.limit);
    }
    try {
      const todo = await this.collaboratorService.findAll(query);
      if (!todo) throw new BadRequestException();
      return todo;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Post()
  create(@Body() collaborator: ICollaborator) {
    try {
      const response = this.collaboratorService.create(collaborator);
      if (!response) throw new BadRequestException();
      return response;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Put()
  update(@Body() collaborator: ICollaborator, @Query('id') id: string) {
    try {
      const response = this.collaboratorService.update(collaborator, id);
      if (!response) throw new BadRequestException();
      return response;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @Delete()
  delete(@Query('id') id: string) {
    return this.collaboratorService.delete(id);
  }
}
