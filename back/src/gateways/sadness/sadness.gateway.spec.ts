import { Test, TestingModule } from '@nestjs/testing';
import { SadnessGateway } from './sadness.gateway';

describe('SadnessGateway', () => {
  let gateway: SadnessGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SadnessGateway],
    }).compile();

    gateway = module.get<SadnessGateway>(SadnessGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
