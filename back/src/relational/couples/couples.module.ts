import { Module } from '@nestjs/common';
import { CouplesService } from './couples.service';
import { CouplesController } from './couples.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Couple } from './entities/couple.entity';
import { Mate } from '../mates/entities/mate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Couple, Mate])],
  controllers: [CouplesController],
  providers: [CouplesService]
})
export class CouplesModule {}
