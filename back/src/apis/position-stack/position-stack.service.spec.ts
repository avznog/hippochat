import { Test, TestingModule } from '@nestjs/testing';
import { PositionStackService } from './position-stack.service';

describe('PositionStackService', () => {
  let service: PositionStackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PositionStackService],
    }).compile();

    service = module.get<PositionStackService>(PositionStackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
