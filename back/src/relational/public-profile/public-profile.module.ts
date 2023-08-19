import { Module } from '@nestjs/common';
import { PublicProfileService } from './public-profile.service';
import { PublicProfileController } from './public-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicProfile } from './entities/public-profile.entity';
import { CouplesService } from '../couples/couples.service';
import { Couple } from '../couples/entities/couple.entity';
import { Mate } from '../mates/entities/mate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicProfile, Couple, Mate])],
  controllers: [PublicProfileController],
  providers: [PublicProfileService, CouplesService]
})
export class PublicProfileModule {}