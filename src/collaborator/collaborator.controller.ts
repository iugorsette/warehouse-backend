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
  findAll(@Query() query: IQuery): Promise<QueryResponse<ICollaborator>> {
    if (Number(query?.offset) > 0) {
      query.offset = Number(query.offset) * Number(query.limit);
    }
    return this.collaboratorService.findAll(query);
  }

  @Post()
  create(@Body() collaborator: ICollaborator) {
    return this.collaboratorService.create(collaborator);
  }

  @Put()
  update(@Body() collaborator: ICollaborator, @Query('id') id: string) {
    return this.collaboratorService.update(collaborator, id);
  }

  @Delete()
  delete(@Query('id') id: string) {
    return this.collaboratorService.delete(id);
  }
}
