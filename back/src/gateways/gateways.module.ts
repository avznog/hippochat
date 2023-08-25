import { Module } from '@nestjs/common';
import { SadnessGateway } from './sadness/sadness.gateway';
import { CouplesService } from 'src/relational/couples/couples.service';
import { Couple } from 'src/relational/couples/entities/couple.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { GatewaysService } from './services/gateways.service';
@Module({
  imports: [TypeOrmModule.forFeature([Couple, Mate])],
  providers: [SadnessGateway, CouplesService, GatewaysService]
})
export class GatewaysModule {}
