import { Test, TestingModule } from '@nestjs/testing';
import { PositionStackController } from './position-stack.controller';

describe('PositionStackController', () => {
  let controller: PositionStackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionStackController],
    }).compile();

    controller = module.get<PositionStackController>(PositionStackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
