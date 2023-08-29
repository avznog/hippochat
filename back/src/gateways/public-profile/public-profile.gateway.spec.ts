import { Test, TestingModule } from '@nestjs/testing';
import { PublicProfileGateway } from './public-profile.gateway';

describe('PublicProfileGateway', () => {
  let gateway: PublicProfileGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicProfileGateway],
    }).compile();

    gateway = module.get<PublicProfileGateway>(PublicProfileGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
