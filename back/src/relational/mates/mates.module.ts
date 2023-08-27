import { Module } from '@nestjs/common';
import { MatesService } from './mates.service';
import { MatesController } from './mates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from './entities/mate.entity';
import { Couple } from '../couples/entities/couple.entity';
import { CouplesService } from '../couples/couples.service';
import { CoupleGateway } from 'src/gateways/couple/couple.gateway';
import { GatewaysService } from 'src/gateways/services/gateways.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mate, Couple])],
  controllers: [MatesController],
  providers: [MatesService, CouplesService, CoupleGateway, GatewaysService]
})
export class MatesModule {}
