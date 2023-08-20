import { Test, TestingModule } from '@nestjs/testing';
import { SadnessController } from './sadness.controller';
import { SadnessService } from './sadness.service';

describe('SadnessController', () => {
  let controller: SadnessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SadnessController],
      providers: [SadnessService],
    }).compile();

    controller = module.get<SadnessController>(SadnessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
