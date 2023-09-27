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
import { IDepartment } from './interfaces/department.interface';
import { DepartmentService } from './department.service';

@UseGuards(AuthGuard)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get()
  findAll(@Query() query: IQuery): Promise<QueryResponse<IDepartment>> {
    if (Number(query?.offset) > 0) {
      query.offset = Number(query.offset) * Number(query.limit);
    }
    return this.departmentService.findAll(query);
  }

  @Post()
  create(@Body() department: IDepartment) {
    return this.departmentService.create(department);
  }

  @Put()
  update(@Body() department: IDepartment, @Query('id') id: string) {
    return this.departmentService.update(department, id);
  }

  @Delete()
  delete(@Query('id') id: string) {
    return this.departmentService.delete(id);
  }
}
