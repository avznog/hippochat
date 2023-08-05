import { Module } from '@nestjs/common';
import { MatesService } from './mates.service';
import { MatesController } from './mates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from './entities/mate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mate])],
  controllers: [MatesController],
  providers: [MatesService]
})
export class MatesModule {}
