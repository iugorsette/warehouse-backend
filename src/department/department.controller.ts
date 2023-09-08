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
  findAll(): Promise<IDepartment[]> {
    return this.departmentService.findAll();
  }

  @Post()
  create(@Body() department: IDepartment) {
    return this.departmentService.create(department);
  }

  @Put()
  update(@Body() department: IDepartment, @Query('id') id: string) {
    this.departmentService.update(department, id);
    return `This action updates a ${department.name} department`;
  }

  @Delete()
  delete(@Query('id') id: string) {
    this.departmentService.delete(id);
    return `This action removes a #${id} department`;
  }
}
