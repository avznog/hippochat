import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PositionStackController } from './position-stack/position-stack.controller';
import { PositionStackService } from './position-stack/position-stack.service';

@Module({
  imports: [HttpModule],
  providers: [PositionStackService],
  controllers: [PositionStackController]
})
export class ApisModule {}
