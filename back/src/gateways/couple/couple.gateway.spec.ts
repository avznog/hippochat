import { Test, TestingModule } from '@nestjs/testing';
import { CoupleGateway } from './couple.gateway';

describe('CoupleGateway', () => {
  let gateway: CoupleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoupleGateway],
    }).compile();

    gateway = module.get<CoupleGateway>(CoupleGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
