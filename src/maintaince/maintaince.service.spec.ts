import { Test, TestingModule } from '@nestjs/testing';
import { MaintainceService } from './maintaince.service';

describe('MaintainceService', () => {
  let service: MaintainceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintainceService],
    }).compile();

    service = module.get<MaintainceService>(MaintainceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
