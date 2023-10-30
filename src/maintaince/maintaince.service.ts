import { Injectable } from '@nestjs/common';
import { CreateMaintainceDto } from './dto/create-maintaince.dto';
import { UpdateMaintainceDto } from './dto/update-maintaince.dto';

@Injectable()
export class MaintainceService {
  create(createMaintainceDto: CreateMaintainceDto) {
    return 'This action adds a new maintaince';
  }

  findAll() {
    return `This action returns all maintaince`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maintaince`;
  }

  update(id: number, updateMaintainceDto: UpdateMaintainceDto) {
    return `This action updates a #${id} maintaince`;
  }

  remove(id: number) {
    return `This action removes a #${id} maintaince`;
  }
}
