import { Test, TestingModule } from '@nestjs/testing';
import { SadnessService } from './sadness.service';

describe('SadnessService', () => {
  let service: SadnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SadnessService],
    }).compile();

    service = module.get<SadnessService>(SadnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
