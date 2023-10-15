import { Test, TestingModule } from '@nestjs/testing';
import { BatteryGateway } from './battery.gateway';

describe('BatteryGateway', () => {
  let gateway: BatteryGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatteryGateway],
    }).compile();

    gateway = module.get<BatteryGateway>(BatteryGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
