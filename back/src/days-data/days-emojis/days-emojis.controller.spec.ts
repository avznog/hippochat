import { Test, TestingModule } from '@nestjs/testing';
import { DaysEmojisController } from './days-emojis.controller';
import { DaysEmojisService } from './days-emojis.service';

describe('DaysEmojisController', () => {
  let controller: DaysEmojisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaysEmojisController],
      providers: [DaysEmojisService],
    }).compile();

    controller = module.get<DaysEmojisController>(DaysEmojisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
