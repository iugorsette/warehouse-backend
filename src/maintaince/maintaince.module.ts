import { Module } from '@nestjs/common';
import { MaintainceService } from './maintaince.service';
import { MaintainceController } from './maintaince.controller';

@Module({
  controllers: [MaintainceController],
  providers: [MaintainceService],
})
export class MaintainceModule {}
