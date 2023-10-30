import { Test, TestingModule } from '@nestjs/testing';
import { MaintainceController } from './maintaince.controller';
import { MaintainceService } from './maintaince.service';

describe('MaintainceController', () => {
  let controller: MaintainceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintainceController],
      providers: [MaintainceService],
    }).compile();

    controller = module.get<MaintainceController>(MaintainceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
