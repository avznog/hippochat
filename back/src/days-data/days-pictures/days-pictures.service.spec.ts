import { Test, TestingModule } from '@nestjs/testing';
import { DaysPicturesService } from './days-pictures.service';

describe('DaysPicturesService', () => {
  let service: DaysPicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaysPicturesService],
    }).compile();

    service = module.get<DaysPicturesService>(DaysPicturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
