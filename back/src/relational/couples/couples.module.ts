import { Module } from '@nestjs/common';
import { CouplesService } from './couples.service';
import { CouplesController } from './couples.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Couple } from './entities/couple.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Couple])],
  controllers: [CouplesController],
  providers: [CouplesService]
})
export class CouplesModule {}
