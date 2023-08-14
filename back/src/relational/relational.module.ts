import { Module } from '@nestjs/common';
import { MatesModule } from './mates/mates.module';
import { MatesController } from './mates/mates.controller';
import { MatesService } from './mates/mates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from './mates/entities/mate.entity';
import { CouplesModule } from './couples/couples.module';

@Module({
  imports: [
    MatesModule, TypeOrmModule.forFeature([Mate]), CouplesModule
  ],
  controllers: [MatesController],
  providers: [MatesService]
})
export class RelationalModule {}
