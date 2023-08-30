import { Module } from '@nestjs/common';
import { DaysPicturesService } from './days-pictures.service';
import { DaysPicturesController } from './days-pictures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysPicture } from './entities/days-picture.entity';
import { Mate } from 'src/relational/mates/entities/mate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DaysPicture, Mate])],
  controllers: [DaysPicturesController],
  providers: [DaysPicturesService]
})
export class DaysPicturesModule {}
