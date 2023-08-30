import { Test, TestingModule } from '@nestjs/testing';
import { DaysEmojisGateway } from './days-emojis.gateway';

describe('DaysEmojisGateway', () => {
  let gateway: DaysEmojisGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaysEmojisGateway],
    }).compile();

    gateway = module.get<DaysEmojisGateway>(DaysEmojisGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
