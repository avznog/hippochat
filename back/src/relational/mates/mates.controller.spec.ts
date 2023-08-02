import { Test, TestingModule } from '@nestjs/testing';
import { MatesController } from './mates.controller';
import { MatesService } from './mates.service';

describe('MatesController', () => {
  let controller: MatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatesController],
      providers: [MatesService],
    }).compile();

    controller = module.get<MatesController>(MatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
