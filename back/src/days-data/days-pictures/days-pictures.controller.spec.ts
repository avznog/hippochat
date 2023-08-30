import { Test, TestingModule } from '@nestjs/testing';
import { DaysPicturesController } from './days-pictures.controller';
import { DaysPicturesService } from './days-pictures.service';

describe('DaysPicturesController', () => {
  let controller: DaysPicturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaysPicturesController],
      providers: [DaysPicturesService],
    }).compile();

    controller = module.get<DaysPicturesController>(DaysPicturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
