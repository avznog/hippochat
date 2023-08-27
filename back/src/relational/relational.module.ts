import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouplesModule } from './couples/couples.module';
import { Mate } from './mates/entities/mate.entity';
import { MatesController } from './mates/mates.controller';
import { MatesModule } from './mates/mates.module';
import { MatesService } from './mates/mates.service';
import { PublicProfileModule } from './public-profile/public-profile.module';
import { SadnessModule } from './sadness/sadness.module';
import { CouplesService } from './couples/couples.service';
import { Couple } from './couples/entities/couple.entity';
import { CoupleGateway } from 'src/gateways/couple/couple.gateway';
import { GatewaysService } from 'src/gateways/services/gateways.service';

@Module({
  imports: [
    MatesModule, PublicProfileModule, CouplesModule, TypeOrmModule.forFeature([Mate, Couple]), SadnessModule
  ],
  controllers: [MatesController],
  providers: [MatesService, CouplesService, CoupleGateway, GatewaysService]
})
export class RelationalModule {}
