import { Module } from '@nestjs/common';
import { SadnessGateway } from './sadness/sadness.gateway';
import { CouplesService } from 'src/relational/couples/couples.service';
import { Couple } from 'src/relational/couples/entities/couple.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { GatewaysService } from './services/gateways.service';
import { PublicProfileGateway } from './public-profile/public-profile.gateway';
import { CoupleGateway } from './couple/couple.gateway';
@Module({
  imports: [TypeOrmModule.forFeature([Couple, Mate])],
  providers: [SadnessGateway, CouplesService, GatewaysService, PublicProfileGateway, CoupleGateway]
})
export class GatewaysModule {}
