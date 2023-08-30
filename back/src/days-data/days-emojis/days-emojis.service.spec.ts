import { Test, TestingModule } from '@nestjs/testing';
import { DaysEmojisService } from './days-emojis.service';

describe('DaysEmojisService', () => {
  let service: DaysEmojisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaysEmojisService],
    }).compile();

    service = module.get<DaysEmojisService>(DaysEmojisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
