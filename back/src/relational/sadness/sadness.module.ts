import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SadnessGateway } from 'src/gateways/sadness/sadness.gateway';
import { GatewaysService } from 'src/gateways/services/gateways.service';
import { CouplesService } from '../couples/couples.service';
import { Couple } from '../couples/entities/couple.entity';
import { Mate } from '../mates/entities/mate.entity';
import { PublicProfile } from '../public-profile/entities/public-profile.entity';
import { Sadness } from './entities/sadness.entity';
import { SadnessController } from './sadness.controller';
import { SadnessService } from './sadness.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sadness, PublicProfile, Couple, Mate])],
  controllers: [SadnessController],
  providers: [SadnessService, SadnessGateway, CouplesService, GatewaysService]
})
export class SadnessModule {}
