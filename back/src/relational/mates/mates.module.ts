import { Module } from '@nestjs/common';
import { MatesService } from './mates.service';
import { MatesController } from './mates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mate } from './entities/mate.entity';
import { Couple } from '../couples/entities/couple.entity';
import { CouplesService } from '../couples/couples.service';
import { MinioService } from 'src/minio/minio.service';
import { ConfigService } from '@nestjs/config';
import { PublicProfileService } from '../public-profile/public-profile.service';
import { PublicProfile } from '../public-profile/entities/public-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mate, Couple, PublicProfile])],
  controllers: [MatesController],
  providers: [MatesService, CouplesService, MinioService, ConfigService, PublicProfileService]
})
export class MatesModule {}
