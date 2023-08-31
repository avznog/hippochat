import { Test, TestingModule } from '@nestjs/testing';
import { DaysPicturesGateway } from './days-pictures.gateway';

describe('DaysPicturesGateway', () => {
  let gateway: DaysPicturesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaysPicturesGateway],
    }).compile();

    gateway = module.get<DaysPicturesGateway>(DaysPicturesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
