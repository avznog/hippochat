import { Module } from '@nestjs/common';
import { MatesModule } from './mates/mates.module';
import { MatesController } from './mates/mates.controller';
import { MatesService } from './mates/mates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from './mates/entities/mate.entity';

@Module({
  imports: [
    MatesModule, TypeOrmModule.forFeature([Mate])
  ],
  controllers: [MatesController],
  providers: [MatesService]
})
export class RelationalModule {}
